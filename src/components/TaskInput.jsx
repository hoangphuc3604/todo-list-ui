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
        placeholder="Nhập tiêu đề công việc..."
      />
      <textarea
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Nhập mô tả công việc..."
        rows="3"
      />
      <button className="bg-blue-500 text-white p-2 w-full" onClick={handleAdd}>
        Thêm
      </button>
    </div>
  );
};

export default TaskInput;
