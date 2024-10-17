import React from "react";
import { Link } from "react-router-dom";

export const FeedbackButton = () => {
    return (
        <Link to="https://forms.gle/RCfJKZtoGXo1Dq9DA" className="create-project-button"
            target="_blank">
            Give Feedback
        </Link>

    );
};
