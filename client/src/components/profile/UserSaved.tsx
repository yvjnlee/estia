import React, { useEffect, useState } from "react";
import { ProjectInfo, ProjectsDB } from "../../types/project";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

export const UserSaved: React.FC = () => {
  const { supabase, user } = useAuth();
  const [savedProjects, setSavedProjects] = useState<ProjectInfo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSaved = async () => {
      try {
        if (user) {
          console.log("User fetched successfully:", user); // Debug user
          const { data: savedData, error: savedError } = await supabase
            .from("saved_projects")
            .select("project_id")
            .eq("profile_id", user.id);
  
          if (savedError) {
            console.error("Error fetching saved projects:", savedError);
            return;
          }
  
          console.log("Saved projects fetched:", savedData); // Debug savedData
  
          if (savedData && savedData.length > 0) {
            const projectIds = savedData.map((row: { project_id: string }) => row.project_id);
            console.log("Project IDs to fetch:", projectIds); // Debug project IDs
  
            const { data: projectsData, error: projectsError } = await supabase
              .from("estia_projects")
              .select("*")
              .in("project_id", projectIds);
  
            if (projectsError) {
              console.error("Error fetching project details:", projectsError);
              return;
            }
  
            console.log("Estia projects data:", projectsData);
  
            const mappedProjects: ProjectInfo[] = projectsData.map((row: ProjectsDB) => ({
              projectName: row.project_name,
              createdAt: row.created_at,
              tech1: row.tech1,
              tech2: row.tech2,
              colour: row.colour,
              description: row.description,
              videoId: row.video_Id,
              repoPath: row.repo_Path,
              project_id: row.project_id,
            }));
  
            setSavedProjects(mappedProjects);
          }
        } else {
          console.log("No user found."); // Debug when no user
        }
      } catch (err) {
        console.error("Error fetching saved projects:", err);
      }
    };
  
    fetchUserSaved();
  }, [user]);
  
  return (
    <>
          <h2 className="saved-heading">Saved Projects</h2>
     <div className="outer-saved-section-div">
    {savedProjects.length > 0 ? (
  <div className="project-theme-section">
    {savedProjects.map((project: ProjectInfo, index: number) => (
      <div key={index} className="projects-section">
        <div className="projects-div">
          <h5
            className="projects-heading"
            onClick={() =>
              navigate(`/project/${encodeURIComponent(project.projectName)}`)
            }
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {project.projectName}
          </h5>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No saved projects found.</p>
)}
</div>
    </>
  );
  
};
