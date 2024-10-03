import React from "react";
import { Link } from "react-router-dom";

export const LearnPreferencesButton = () => {
    return (
        <Link to="/preference" className="create-project-button">
            What to Learn
        </Link>
    );
};
