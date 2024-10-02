import {useState} from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
                    <label htmlFor=''>Write text here...</label>
                    <button onClick={postComment}>Post</button>
                </div>

            
            <div className="comment-section">
                <div className="vote">
                          <button  onClick={voteUp}><ExpandLessIcon fontSize='medium'/></button>
                        <span>{votes}</span>
                        <button  onClick={voteDown}><ExpandMoreIcon fontSize='medium' /></button>
                </div>
                <div className="comment">
                    <h3>michaelzhou1232</h3>
                    <p>
                    For the people who have the account page black when you just create the account...
                    </p>
                    <button className="reply-btn">
                        <ReplyIcon style = {{paddingRight: '0.5rem'}}/>
                        Reply
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default Comments;