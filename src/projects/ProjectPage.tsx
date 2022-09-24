import React, { useEffect, useState } from "react";
import { projectAPI } from "./ProjectAPI";
import ProjectDetail from "./ProjectDetail";
import { useParams } from "react-router-dom";
import { Project } from "./Project";

const ProjectPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    projectAPI
      .find(id)
      .then((data) => {
        setProject(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <h1>プロジェクト詳細</h1>
      {project && <ProjectDetail project={project} />}
    </div>
  );
};

export default ProjectPage;
