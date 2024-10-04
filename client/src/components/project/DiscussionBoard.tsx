import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";
import { ProjectInfo } from "../../types/project";
import { User } from "../../types/user";
import { CommentInfo, CommentDB } from "../../types/comment";
import supabase from "../../SupabaseClient";

const DiscussionBoard: React.FC<{project: ProjectInfo, comments: CommentInfo[] }> = ({ project, comments }) => {
    
    
    // const commentArr: Comment[] = [
    //     {
    //         user: 'michaelzhou1232',
    //         comment: 'For the people who have the account page black when you just create the account, I...',
    //         votes: 0
    //     },
    //     {
    //         user: 'anne123',
    //         comment: 'jdghjhglkhark',
    //         votes: 0
    //     },
    //     {
    //         user: 'anne1234',
    //         comment: 'flglkajlkejkg',
    //         votes: 0
    //     }
    // ]

    
// export interface CommentInfo{
//     commentId: number,
//     projectId: string,
//     userId: string,
//     content: string,
//     likes: number
//     username: string
// }
    const { user } = useAuth();
    const currProject = project;
    const [newComment, setNewComment] = useState('');
    const [existingComments, setExistingComments] = useState<CommentInfo[]>(comments);

    const changeVote = ( commentId : number, votes: number) => {
        setExistingComments(existingComments =>
            existingComments.map(comment =>
              comment.commentId === commentId ? { ...comment, votes: comment.likes + votes } : comment
            ));
    }

    
    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setNewComment(event.target.value);
    }
    // output temporary comment but it'll be in the database at the next reload
    const postComment = async () => {
        
        const { data, error } = await supabase
            .from('comments')
            .insert({
                    projectId: project.projectId,
                    userId: user.id,
                    content: newComment,
                    likes: 0,
                    username: user.username
                })
            .select() // data holds the column object that was just added
        if (error) {
            console.log("Could not add comment!")
        }

        console.log(data);
        console.log(comments);

        if (data) {
            const mappedData : CommentInfo = data[0].map((row: CommentDB) => ({
                commentId: row.comment_id,
                projectId: row.project_id,
                userId: row.user_id,
                content: row.content,
                likes: row.likes,
                username: row.username
            }));
            comments.push(mappedData);
        }
        
        console.log(comments);
        setExistingComments(comments);
        setNewComment('');
    }

    return (
        <div className='comment-container'>
            <h1> Discussion (20)</h1>
            <div className="discussion-input">
                <input type='text' value={newComment}  onChange={updateComment} required></input>
                <label className='placeholders' >Add a comment...</label>
                <button onClick={postComment}>Post</button>
            </div>
            <ul>
            {existingComments.map((comment) => (
                <li className="comment-section" key={comment.commentId}>
                    <div className="vote">
                        <button onClick={() => changeVote(comment.likes, 1)}><img src={UpChevron} /></button>
                        <span>{comment.likes}</span>
                        <button onClick={() => changeVote(comment.likes, -1)}><img src={DownChevron} /></button>
                    </div>
                    <div className="comment">
                        <h3 className = "existing-comment-header">{comment.username}</h3> 
                        <p className = "existing-comment-body">{comment.content}</p>
                        <button className="reply-btn">Reply</button>
                    </div>
                </li>))}
            </ul>
        </div>
    );
};

export default DiscussionBoard;