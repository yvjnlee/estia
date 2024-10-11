import React, { useEffect } from "react";
import { useState } from "react";

import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";
import { Comment, User } from "../../common/types";
import { getSession } from "../../api/authAPI";
import { getUserById } from "../../api/userAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const DiscussionBoard: React.FC<{comments: Comment[] }> = ({ comments }) => {
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


    const changeVote = ( commentId : string, votes: number) => {
        setExistingComments(existingComments =>
            existingComments.map(comment =>
              comment.commentId === commentId ? { ...comment, votes: comment.likes + votes } : comment
            ));
    }

    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setNewComment(event.target.value);
    };

    const postComment = () => {

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
                        <button onClick={() => changeVote(comment.commentId, 1)}><img src={UpChevron} /></button>
                        <span>{comment.likes}</span>
                        <button onClick={() => changeVote(comment.commentId, -1)}><img src={DownChevron} /></button>
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
