import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

const AddProject: React.FC = () => {
  const { supabase } = useProject(); // Access supabase from the ProjectContext
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [tech1, setTech1] = useState("");
  const [tech2, setTech2] = useState("");
  const [description, setDescription] = useState("");
  const [videoId, setVideoId] = useState("");
  const [repoPath, setRepoPath] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("estia_projects")
        .insert([
          {
            project_name: projectName,
            tech1: tech1,
            tech2: tech2,
            description: description,
            video_Id: videoId,
            repo_Path: repoPath,
            colour: color,
          },
        ]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Project added:", data);
        navigate("/"); // Navigate back to projects list after submission
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-project-form">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tech Stack 1:</label>
          <input
            type="text"
            value={tech1}
            onChange={(e) => setTech1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tech Stack 2:</label>
          <input
            type="text"
            value={tech2}
            onChange={(e) => setTech2(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Video ID:</label>
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
        </div>
        <div>
          <label>Repo Path:</label>
          <input
            type="text"
            value={repoPath}
            onChange={(e) => setRepoPath(e.target.value)}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
