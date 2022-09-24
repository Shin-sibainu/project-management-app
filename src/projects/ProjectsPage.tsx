import React, { useEffect, useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";
import ProjectList from "./ProjectList";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const saveProject = (project: Project) => {
    // let updatedProjects = projects.map((p: Project) => {
    //   return p.id === project.id ? project : p;
    // });
    // setProjects(updatedProjects);

    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //fetch api
  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);

        if (currentPage === 1) {
          setProjects(data);
        } else {
          //以前のプロジェクトと合わせてデータを追加する
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [currentPage]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <>
      <ProjectList projects={projects} onSave={saveProject} />
      {!loading && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                もっと見る
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>ロード中・・・</p>
        </div>
      )}
    </>
  );
};

export default ProjectsPage;
