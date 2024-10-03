import React from "react";
import { useState } from "react";

import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";
import { useAuth } from "../../context/AuthContext";

const DiscussionBoard: React.FC = () => {
    type Comment = {
        user: string;
        comment: string;
        votes: number;
    };
    const commentArr: Comment[] = [
        {
            user: "michaelzhou1232",
            comment:
                "For the people who have the account page black when you just create the account, I...",
            votes: 0,
        },
        {
            user: "anne123",
            comment: "jdghjhglkhark",
            votes: 0,
        },
        {
            user: "anne1234",
            comment: "flglkajlkejkg",
            votes: 0,
        },
    ];
    let { user } = useAuth();

    const changeVote = (user: string, numVotes: number) => {
        setAllComments((allComments) =>
            allComments.map((comment) =>
                comment.user === user ? { ...comment, votes: comment.votes + numVotes } : comment
            )
        );
    };

    const [newComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState<Comment[]>(commentArr);

    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setNewComment(event.target.value);
    };

    const postComment = () => {
        if (newComment !== "") {
            commentArr.push({
                user: user?.username ? user.username : "Unknown User",
                comment: newComment,
                votes: 0,
            });
            console.log(commentArr);
            setAllComments(commentArr);
            setNewComment(""); // reset comment input
        } else {
            console.log("Your comment is empty.");
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
            <ul>
                {allComments.map((comment) => (
                    <li className="comment-section" key={comment.user}>
                        <div className="vote">
                            <button onClick={() => changeVote(comment.user, 1)}>
                                <img src={UpChevron} />
                            </button>
                            <span>{comment.votes}</span>
                            <button onClick={() => changeVote(comment.user, -1)}>
                                <img src={DownChevron} />
                            </button>
                        </div>
                        <div className="comment">
                            <h3 className="existing-comment-header">{comment.user}</h3>
                            <p className="existing-comment-body">{comment.comment}</p>
                            <button className="reply-btn">Reply</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DiscussionBoard;
