import React from "react";
import { Link } from "react-router-dom";

export const CreateProjectButton = () => {
  return (
    <Link to="/add-project" className="create-project-button">
      Create Project
    </Link>
  );
};
