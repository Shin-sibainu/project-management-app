import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project: Project;
}

const ProjectForm = ({
  onCancel,
  onSave,
  project: initialProject,
}: ProjectFormProps) => {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  const handleChange = (e: any) => {
    const { type, value, checked, name } = e.target;
    console.log(name);
    let updatedValue = type === "checkbox" ? checked : value;

    if (type === "number") {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    //ここで新しいプロジェクトに更新する
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    setErrors(() => validate(updatedProject));
  };

  function validate(project: Project) {
    let errors = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "名前が必要です。";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "3文字以上で入力してください";
    }
    if (project.description.length === 0) {
      errors.description = "詳細が必要です。";
    }
    if (project.budget === 0) {
      errors.budget = "予算が必要です。";
    }
    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">プロジェクト名</label>
      <input
        type="text"
        name="name"
        placeholder="名前を入力"
        onChange={handleChange}
        value={project.name}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">プロジェクト概要</label>
      <textarea
        name="description"
        placeholder="概要を入力"
        cols={35}
        rows={1}
        onChange={handleChange}
        value={project.description}
      ></textarea>
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">プロジェクト予算</label>
      <input
        type="number"
        name="budget"
        placeholder="予算を入力"
        onChange={handleChange}
        value={project.budget}
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">決定/未決定</label>
      <input
        type="checkbox"
        name="isActive"
        onChange={handleChange}
        checked={project.isActive}
      />

      <div className="input-group">
        <button className="primary bordered medium">保存</button>
        <button type="button" className="bordered medium" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
