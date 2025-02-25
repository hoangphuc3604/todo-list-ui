import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  removeTask,
  toggleTaskStatus,
} from "../store/features/taskSlice";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = async (task) => {
    const result = await dispatch(createTask(task));
    if (createTask.fulfilled.match(result)) {
      dispatch(fetchTasks());
    }
  };

  const handleToggleTask = async (id, completed) => {
    const result = await dispatch(toggleTaskStatus({ id, completed }));
    if (toggleTaskStatus.fulfilled.match(result)) {
      dispatch(fetchTasks());
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg">
      <Header />
      <TaskInput addTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        removeTask={handleDeleteTask}
        toggleTask={handleToggleTask}
      />
    </div>
  );
};

export default Home;
