import { Project } from "./Project";

const baseURL = "http://localhost:4000";
const url = `${baseURL}/projects`;

const parseJSON = (response: Response) => {
  return response.json();
};

const convertToProjectModels = (data: any) => {
  let projects: Project[] = data.map(convertToProjectModel);
  return projects;
};

const convertToProjectModel = (item: any) => {
  return new Project(item);
};

const delay = (ms: number) => {
  return (x: any): Promise<any> => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(x);
      }, ms)
    );
  };
};

const projectAPI = {
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}$_limit=${limit}&_sort=name`)
      .then(delay(600))
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log("クライアントエラー" + error);
        throw new Error(
          "プロジェクトの取得に失敗しました。もう一度やり直してください。"
        );
      });
  },

  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("クライアントエラー" + error);
        throw new Error(
          "プロジェクトの更新に失敗しました。もう一度やり直してください。"
        );
      });
  },

  find(id: number) {
    return fetch(`${url}/${id}`).then(parseJSON).then(convertToProjectModel);
  },
};

export { projectAPI };
