import React, { useState } from "react";
import LockImage from "../../../img/Lock.svg";
import UnlockImage from "../../../img/Unlock.svg";

interface YouTubeEmbedProps {
    videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);  // To track if clicked

    return (
        <div className="youtube-container">
            {!isClicked && (
                <div 
                    className="youtube-overlay"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsClicked(true)} // Remove overlay on click
                >
                    <img
                        src={isHovered ? UnlockImage : LockImage}
                        alt={isHovered ? "Unlock Icon" : "Lock Icon"}
                        className="lock-unlock-icon"
                    />
                    <span className="overlay-text">
                        {isHovered ? "Click to see the video" : "Try the idea yourself before seeing the video"}
                    </span>
                </div>
            )}
            <iframe
                className="youtube-embed-iframe"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={isClicked ? {} : { pointerEvents: "none" }} // Disable clicking until overlay is gone
            ></iframe>
        </div>
    );
};

export default YouTubeEmbed;
