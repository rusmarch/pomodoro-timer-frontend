import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'src/store/store';
import { taskService } from 'src/features/tasks/taskService';
import { Task } from 'src/types/task';
import { CreateTaskData } from 'src/types/task';

export type TaskState = {
  currentTask: Task | null;
  oneTask: Task | null;
  allTasks: Task[] | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  searchQuery: string;
};

const initialState: TaskState = {
  allTasks: null,
  currentTask: null,
  oneTask: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  searchQuery: '',
};

export const createNewTask = createAsyncThunk<Task, CreateTaskData>(
  'tasks/create',
  async (taskData: CreateTaskData, thunkAPI) => {
    try {
      const response = await taskService.createTask(taskData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllTask = createAsyncThunk<Task[]>(
  'tasks/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await taskService.getAllTask();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeTask = createAsyncThunk<string, string>(
  'tasks/remove',
  async (taskId: string, thunkAPI) => {
    try {
      await taskService.removeTask(taskId);
      return taskId;
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateTask = createAsyncThunk<Task, Task>(
  'task/update',
  async (updatedTaskData: Task, thunkAPI) => {
    try {
      const response = await taskService.updateTask(updatedTaskData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reset: (state) => {
      state.allTasks = null;
      state.oneTask = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      state.currentTask = action.payload;
    },
    complete: (state, action: PayloadAction<Task>) => {
      if (state.allTasks) {
        state.allTasks = state.allTasks?.map((task) =>
          task._id === action.payload._id
            ? { ...task, complete: action.payload.complete }
            : task
        );
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    // editTask: (state, action: PayloadAction<Task>) => {
    //    state.tasks = state.tasks.map(task =>
    //       task.id === action.payload.id
    //          ? { ...task, title: action.payload.title }
    //          : task
    //    )
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewTask.fulfilled, (state, action) => {
        if (state.allTasks) {
          state.allTasks = [...state.allTasks, action.payload];
        }
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.allTasks = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        if (state.allTasks) {
          state.allTasks = state.allTasks.filter(
            (task) => task._id !== action.payload
          );
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (state.allTasks) {
          state.allTasks = state.allTasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          );
        }
      });
  },
});

export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;
export const selectOneTask = (state: RootState) => state.tasks.oneTask;
export const selectIsSuccess = (state: RootState) => state.tasks.isError;
export const selectIsLoading = (state: RootState) => state.tasks.isLoading;
export const selectIsError = (state: RootState) => state.tasks.isError;
export const selectMessage = (state: RootState) => state.tasks.message;
export const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;

export const { reset, setCurrentTask, complete, setSearchQuery } =
  taskSlice.actions;

export default taskSlice.reducer;
