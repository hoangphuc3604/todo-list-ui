import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  removeTask,
  toggleTaskStatus,
  clearMessage,
} from "../store/features/taskSlice";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks, error, loading } = useSelector((state) => state.tasks);

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

  useEffect(() => {
    if (error) {
      toast.error(error.log);
    }

    dispatch(clearMessage());
  }, [error]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-lg">
      <Header />
      {loading && (
        <div className="flex justify-center my-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
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
