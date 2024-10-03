import { useState } from 'react';

import UpChevron from "../../img/UpChevron.svg";
import DownChevron from "../../img/DownChevron.svg";

import ReplyIcon from '@mui/icons-material/Reply';

const Comments: React.FC = () => {
    // const [voteUpHovered, setUpHovered] = useState<boolean>(false);
    // const [voteDownHovered, setDownHovered] = useState<boolean>(false);
    // const voteUpHover = () => {
    //     setUpHovered(!voteUpHovered);
    // }
    // const voteDownHover = () => {
    //     setDownHovered(!voteDownHovered);
    // }

    const [votes, setVotes] = useState(0); // fetch votes from backend
    const voteUp = () => {
        setVotes(votes + 1);
    }
    const voteDown = () => {
        setVotes(votes - 1);
    }

    const [comment, setComment] = useState('');
    const postComment = () => {

    }
    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }
    return (
        <div className='comment-container'>

            <h1> Discussion (20)</h1>
            <div className="discussion-input">
                <input type='text' placeholder={comment} onChange={updateComment} required></input>
                <label className='placeholders' >Add a comment...</label>
                <button onClick={postComment}>Post</button>
            </div>


            <div className="comment-section">
                <div className="vote">
                    <button onClick={voteUp}>
                        <img src={UpChevron} />
                    </button>
                    <span>{votes}</span>
                    <button onClick={voteDown}>
                        <img src={DownChevron} />
                    </button>
                </div>
                <div className="comment">
                    <h3 className='existing-comment-header'>michaelzhou1232</h3>
                    <p className='existing-comment-body'>
                        For the people who have the account page black when you just create the account, I've found that you must to Sign up, log out, and then login in order to the account creation actually
                        impacts in firebase cloud and you can save your shows and get display at your account-
                        At least I'm having this issue, and solved like that.
                    </p>
                    <button className="reply-btn">
                        Reply
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Comments;