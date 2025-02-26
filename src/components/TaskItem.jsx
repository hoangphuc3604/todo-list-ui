const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <li className="border p-2 mt-2 bg-white flex justify-between items-center">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          className="cursor-pointer"
        />
        <div>
          <h3
            className={`font-bold ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
      </div>
      <button className="text-red-500" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
