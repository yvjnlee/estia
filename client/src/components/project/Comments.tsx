import {useState} from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Comments: React.FC = () => {
    // const [focused, setFocused] = useState<boolean>(false);
    // const handleFocus = () => {
    //     setFocused(true);
    // }
    // const handleBlur = () => {
    //     setFocused(false);
    // }
    const [voteUpHovered, setUpHovered] = useState<boolean>(false);
    const [voteDownHovered, setDownHovered] = useState<boolean>(false);
    const voteUpHover = () => {
        setUpHovered(!voteUpHovered);
    }
    const voteDownHover = () => {
        setDownHovered(!voteDownHovered);
    }
    
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
        <div className="comment-container">
            
            <h1> Discussion (20)</h1>
                <div className="discussion-input">
                    <input type='text' placeholder={comment} onChange={updateComment} required></input>
                    <label htmlFor=''>Comment</label>
                    <button className="submit-comment-button" onClick={postComment}>Post</button>
                </div>

            
            <div className="comment-section">
                <div className="comment">
                    <h3>michaelzhou1232</h3>
                    <div className="vote">
                        <button onMouseEnter={voteUpHover} onMouseLeave={voteUpHover} onClick={voteUp}><ExpandLessIcon fontSize={voteUpHovered ? 'medium' : 'small'} /></button>
                        <span>{votes}</span>
                        <button onMouseEnter={voteDownHover} onMouseLeave={voteDownHover} onClick={voteDown}><ExpandMoreIcon fontSize={voteDownHovered ? 'medium' : 'small'} /></button>
                    </div>
                
                <p>
                For the people who have the account page black when you just create the account...
                </p>
                <button className="reply-btn">Reply</button>
            </div>
            </div>
        </div>
    );
};

export default Comments;