import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, addTask, deleteTask, toggleTask } from "../../api/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const tasks = await getTasks();
      return fulfillWithValue(tasks);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, { fulfillWithValue, rejectWithValue }) => {
    try {
      const newTask = await addTask(task);
      return fulfillWithValue(newTask);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      await deleteTask(id);
      return fulfillWithValue(id);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTask",
  async ({ id, completed }) => {
    await toggleTask(id, completed);
    return { id, completed };
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {
    clearMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.loading = false;
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const { id, completed } = action.payload;
        const task = state.tasks.find((task) => task.id === id);
        task.completed = !completed;

        state.loading = false;
      })
      .addCase(toggleTaskStatus.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(toggleTaskStatus.pending, (state) => {
        state.loading = true;
      });
  },
});

export default tasksSlice.reducer;
export const { clearMessage } = tasksSlice.actions;
