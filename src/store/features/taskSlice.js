import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, addTask, deleteTask, toggleTask } from "../../api/api";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await getTasks();
});

export const createTask = createAsyncThunk("tasks/createTask", async (task) => {
  await addTask(task);
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (id) => {
  await deleteTask(id);
  return id;
});

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTask",
  async ({ id, completed }) => {
    await toggleTask(id, completed);
    return { id, completed };
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {})
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) {
          task.completed = action.payload.completed;
        }
      });
  },
});

export default tasksSlice.reducer;
