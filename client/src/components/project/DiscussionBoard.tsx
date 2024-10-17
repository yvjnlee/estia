import React, { useEffect } from "react";
import { useState } from "react";

import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";
import { Comment, User, Project } from "../../common/types";
import { getSession } from "../../api/authAPI";
import { getUserById } from "../../api/userAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addComment } from "../../api/commentAPI";
import { getCommentInteraction, addCommentInteraction, editCommentInteraction, removeCommentInteraction} from "../../api/commentInteractionAPI";
import { createCommentInteraction } from "../../store/slices/commentInteractionSlice";

const DiscussionBoard: React.FC<{comments: Comment[], project: Project | null }> = ({ comments, project }) => {
    const dispatch = useAppDispatch();
    
    const [user, setUser] = useState<User | null>(null);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        getSession().then((session) => {
            const userId = session?.user.id;

            if (userId) {
                getUserById(dispatch, userId).then((user) => {
                    setUser(user);
                });
            }
        })
    }, []);

    const changeVote = async ( comment : Comment, interaction: boolean ) => {
        // check if comment interaction exists
        // if data: use edit interaction
        // if not data: use create interaction
        if (user && project) {
            const commentInteraction = await getCommentInteraction(dispatch, comment.commentId, user.id)
            if (commentInteraction) {
                console.log("hihihihihihihihi")
                await editCommentInteraction(
                    dispatch,
                    project?.projectId ? project?.projectId : 'null',
                    comment.commentId,
                    user.id,
                    { interaction: interaction },
                )
            } else {
                await addCommentInteraction(
                    dispatch,
                    {
                        comment_id: comment.commentId,
                        user_id: user.id,
                        interaction: interaction
                    },
                    project?.projectId ? project?.projectId : 'null',
                    comment.commentId,
                    user.id,
                )
            }
        }
    }

    // const removeVote() {

    // }

    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setNewComment(event.target.value);
    };

    const postComment = () => {
        if (user && project) { // change this later
            addComment(dispatch, {
                projectId: project?.projectId ? project?.projectId : 'empty',
                userId: user.id,
                content: newComment,
                likes: 0,
                username: user.username ? user.username : 'empty',
            });
        }

        setNewComment("");
    };

    return (
        <div className="comment-container">
            <h1> Discussion ({comments?.length})</h1>
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
