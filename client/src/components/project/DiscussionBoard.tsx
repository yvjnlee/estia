import supabase from "../../SupabaseClient";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";
import { User } from "../../types/user";
import { ProjectInfo } from "../../types/project";
import { CommentInfo, CommentDB } from "../../types/comment";
import { useUser } from "../../context/UserContext"


const DiscussionBoard: React.FC<{project: ProjectInfo, comments: CommentInfo[] }> = ({ project, comments }) => {
    const { retrieveUser } = useUser();
    const { user } = useAuth();

    const [currUser, setCurrUser] = useState<User | null>(null);
    const [newComment, setNewComment] = useState('');
    const [existingComments, setExistingComments] = useState<CommentInfo[]>(comments);

    useEffect(() => {
        // fetch user and set it
        const fetchUser = async () => {
            const userId = user?.id; // Safely get user.id

            if (userId) {
                const userData = await retrieveUser(userId); // Await the promise
                setCurrUser(userData); // Set the user data in state
            }
        };

        fetchUser(); // Call the async function
    }, [retrieveUser]);

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
        if (currUser) {
            const { data, error } = await supabase
            .from('comments')
            .insert({
                    project_id: project.projectId,
                    user_id: currUser.id,
                    content: newComment,
                    likes: 0,
                    username: currUser.username
                })
            .select() // data holds the column object that was just added

            if (error) {
                console.log(error);
                console.log("Could not add comment!")
            }

            if (data) {
                const mappedData : CommentInfo = {
                    commentId: data[0].comment_id,
                    projectId: data[0].project_id,
                    userId: data[0].user_id,
                    content: data[0].content,
                    likes: data[0].likes,
                    username: data[0].username
                };
                comments.push(mappedData);
            }
            
            console.log(comments);
            setExistingComments(comments);
            setNewComment('');
        } else {
            console.log("You can't comment!")
        }
    }

    return (
        <div className="comment-container">
            <h1> Discussion (20)</h1>
            <div className="discussion-input">
                <input type="text" value={newComment} onChange={updateComment} required></input>
                <label className="placeholders">Add a comment...</label>
                <button onClick={postComment}>Post</button>
            </div>
            <ul>
            {comments.map((comment) => (
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
