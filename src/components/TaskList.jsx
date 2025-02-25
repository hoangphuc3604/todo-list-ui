import TaskItem from "./TaskItem";

const TaskList = ({ tasks, removeTask, toggleTask }) => {
  return (
    <ul className="mt-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => removeTask(task.id)}
          onToggle={toggleTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
