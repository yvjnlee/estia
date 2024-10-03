import { useState } from 'react';

import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";

import UpChevronClicked from "../../img/UpChevronClicked.svg";
import DownChevronClicked from "../../img/DownChevronClicked.svg";

import { useAuth } from "../../context/AuthContext";

const DiscussionBoard: React.FC = () => {
    type Comment = {
        user: string,
        comment: string,
        votes: number,
        userVote: 'none' | 'up' | 'down' // Track user's vote state
    };

    const commentArr: Comment[] = [
        {
            user: 'michaelzhou1232',
            comment: 'For the people who have the account page black when you just create the account, I...',
            votes: 0,
            userVote: 'none'
        },
        {
            user: 'anne123',
            comment: 'jdghjhglkhark',
            votes: 0,
            userVote: 'none'
        },
        {
            user: 'anne1234',
            comment: 'flglkajlkejkg',
            votes: 0,
            userVote: 'none'
        }
    ];

    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [allComments, setAllComments] = useState<Comment[]>(commentArr);

    const changeVote = (commentUser: string, action: 'up' | 'down') => {
        setAllComments(allComments =>
            allComments.map(comment => {
                if (comment.user === commentUser) {
                    let updatedVotes = comment.votes;

                    // Handle vote logic
                    if (action === 'up') {
                        if (comment.userVote === 'up') {
                            // Remove upvote
                            updatedVotes -= 1;
                            return { ...comment, votes: updatedVotes, userVote: 'none' };
                        } else if (comment.userVote === 'down') {
                            // Switch from downvote to upvote
                            updatedVotes += 2; // remove downvote and add upvote
                            return { ...comment, votes: updatedVotes, userVote: 'up' };
                        } else {
                            // First-time upvote
                            updatedVotes += 1;
                            return { ...comment, votes: updatedVotes, userVote: 'up' };
                        }
                    } else if (action === 'down') {
                        if (comment.userVote === 'down') {
                            // Remove downvote
                            updatedVotes += 1;
                            return { ...comment, votes: updatedVotes, userVote: 'none' };
                        } else if (comment.userVote === 'up') {
                            // Switch from upvote to downvote
                            updatedVotes -= 2; // remove upvote and add downvote
                            return { ...comment, votes: updatedVotes, userVote: 'down' };
                        } else {
                            // First-time downvote
                            updatedVotes -= 1;
                            return { ...comment, votes: updatedVotes, userVote: 'down' };
                        }
                    }
                }
                return comment;
            })
        );
    };

    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const postComment = () => {
        if (newComment !== '') {
            const newCommentEntry: Comment = {
                user: user?.username ? user.username : 'Unknown User',
                comment: newComment,
                votes: 0,
                userVote: 'none' // Default user vote state
            };
            setAllComments(prevComments => [...prevComments, newCommentEntry]);
            setNewComment(''); // Reset comment input
        } else {
            console.log("Your comment is empty.");
        }
    };

    return (
        <div className='comment-container'>
            <h1> Discussion (20)</h1>
            <div className="discussion-input">
                <input type='text' value={newComment} onChange={updateComment} required />
                <label className='placeholders'>Add a comment...</label>
                <button onClick={postComment}>Post</button>
            </div>
            <ul>
                {allComments.map((comment) => (
                    <li className="comment-section" key={comment.user}>
                        <div className="vote">
                            <button onClick={() => changeVote(comment.user, 'up')}>
                                <img src={comment.userVote === 'up' ? UpChevronClicked : UpChevron} alt="Upvote" />
                            </button>
                            <span>{comment.votes}</span>
                            <button onClick={() => changeVote(comment.user, 'down')}>
                                <img src={comment.userVote === 'down' ? DownChevronClicked : DownChevron} alt="Downvote" />
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
