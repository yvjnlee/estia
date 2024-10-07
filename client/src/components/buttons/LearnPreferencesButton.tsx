import React from "react";
import { Link } from "react-router-dom";

export const LearnPreferencesButton = () => {
    return (
        <Link to="/preference" className="create-project-button">
        <div className="ai-div">
        <span className="ai-tag">New</span> Skill Advisor 
        </div>     
  </Link>
    );
};
