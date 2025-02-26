import { useState } from "react";

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) return;
    addTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of task..."
      />
      <textarea
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description of task..."
        rows="3"
      />
      <button className="bg-blue-500 text-white p-2 w-full" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default TaskInput;
