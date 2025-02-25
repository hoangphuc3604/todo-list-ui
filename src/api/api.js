import axios from "axios";

export const getTasks = async () => {
  const response = await axios.get(process.env.REACT_APP_API_SERVER + "/tasks");
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(
    process.env.REACT_APP_API_SERVER + "/tasks",
    {
      title: task.title,
      description: task.description,
    }
  );
  return response.data;
};

export const toggleTask = async (id, completed) => {
  await axios.put(`${process.env.REACT_APP_API_SERVER + "/tasks"}/${id}`, {
    completed: !completed,
  });
};

export const deleteTask = async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_SERVER + "/tasks"}/${id}`);
};
