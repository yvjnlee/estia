import supabase from "../../SupabaseClient";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";
import { User } from "../../types/user";
import { ProjectInfo } from "../../types/project";
import { CommentInfo, CommentDB } from "../../types/comment";
import { useUser } from "../../context/UserContext"
import { isEmptyObj } from "groq-sdk/core";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";


const DiscussionBoard: React.FC<{project: ProjectInfo, comments: CommentInfo[] }> = ({ project, comments }) => {
    const { retrieveUser } = useUser();
    const { user } = useAuth();

    const [currUser, setCurrUser] = useState<User | null>(null);
    const [newComment, setNewComment] = useState('');
    // const commentsRef = useRef<CommentInfo[]>(comments);

    useEffect(() => {
        // fetch user and set it
        const fetchUser = async () => {
            const userId = user?.id; 

            if (userId) {
                const userData = await retrieveUser(userId); 
                setCurrUser(userData);
            }
        };

        fetchUser(); 

    }, [retrieveUser]);

    useEffect(() => {

    })
    const changeVote = async ( comment : CommentInfo, interaction: boolean) => {
        let likes = 1;

        if (interaction === false) {
            likes = -1;
        }
        
        // query to check if user has voted before
        // if query isnt null then we render that out using a bool or smth 
        // if query is null then wtv the user clicks on will work and update the comments
        // add patch request
        const { data, error } = await supabase 
            .from('comment_interactions')
            .select('interaction')
            .eq("comment_id", comment.commentId)
            .eq("user_id", user?.id)

        if (error) {
                console.log(error);
                console.log("Cannot upvote this comment")
        }

        if (data) {
            if (isEmptyObj(data)) {
                console.log("posting")
                const { error } = await supabase 
                    .from('comment_interactions')
                    .insert( {
                        comment_id: comment.commentId,
                        user_id: user?.id,
                        interaction: interaction
                    })
                
                if ( error ){
                    console.log(error);
                }

                // update the likes, should add an error object later
                await supabase 
                    .from('comments')
                    .update({likes: comment.likes + likes})
                    .eq('comment_id', comment.commentId)
                
                // comments = comments.map(comment =>
                //   comment.commentId === comment.commentId ? { ...comment, likes: comment.likes + likes } : comment);
                // console.log(comments);

            } else if (data[0].interaction !== interaction) {
                // patch request to update the vote in comment table and comment_interactions table
                console.log(data[0].interaction);
                console.log("patching")
                await supabase 
                    .from('comments')
                    .update({likes: comment.likes + 2 * likes})
                    .eq('comment_id', comment.commentId)
                
                await supabase
                    .from('comment_interactions')
                    .update({interaction: interaction})
                    .eq('comment_id', comment.commentId)
                    .eq('user_id', user?.id)
                
                // comments = comments.map(comment =>
                //     comment.commentId === comment.commentId ? { ...comment, likes: comment.likes + 2 * likes } : comment);
                // // setExistingComments(comments);
                // console.log(comments);
            } 
        }
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
            // setExistingComments(comments);
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
            <ul className="comments">
            {comments.map((comment) => (
                <li className="comment-section" key={comment.commentId}>
                    <div className="vote">
                        <button onClick={() => changeVote(comment, true)}><img src={UpChevron} /></button>
                        <span>{comment.likes}</span>
                        <button onClick={() => changeVote(comment, false)}><img src={DownChevron} /></button>
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
