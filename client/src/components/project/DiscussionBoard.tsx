import React, { useEffect } from "react";
import { useState } from "react";

import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";
import { Comment, User, Project } from "../../common/types";
import { getSession } from "../../api/authAPI";
import { getUserById } from "../../api/userAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addComment } from "../../api/commentAPI";

const DiscussionBoard: React.FC<{comments: Comment[], project: Project | null }> = ({ comments, project }) => {
    const dispatch = useAppDispatch();
    
    const [user, setUser] = useState<User | null>(null);
    const [newComment, setNewComment] = useState("");
    const [existingComments, setExistingComments] = useState<Comment[]>(comments);

    useEffect(() => {
        getSession().then((session) => {
            const userId = session?.user.id;

            if (userId) {
                getUserById(dispatch, userId).then((user) => {
                    setUser(user);
                });
            }
        });
    }, []);

    const changeVote = async ( comment : Comment, interaction: boolean) => {
        let likes = 1;
        if (interaction === false) {
            likes = -1;
        }

        // change below
        const { data, error } = await supabase 
            .from('comment_interactions')
            .select('interaction')
            .eq("comment_id", comment.commentId)
            .eq("user_id", user?.id)
  
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
            } 
            // change above
        }

    }
    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setNewComment(event.target.value);
    };

    const postComment = () => {
        if (user && project) { // change this later
            addComment(dispatch, {
                projectId: project?.projectId ? project?.projectId : " empty",
                userId: user.id,
                content: newComment,
                likes: 0,
                username: user.username ? user.username : 'empty',
            });
        }
    };

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
                        <button onClick={() => changeVote(comment.commentId, true)}><img src={UpChevron} /></button>
                        <span>{comment.likes}</span>
                        <button onClick={() => changeVote(comment.commentId, false)}><img src={DownChevron} /></button>
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
