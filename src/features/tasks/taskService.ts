import { $api } from 'src/http';
import { Task, CreateTaskData, DeleteResponse } from 'src/types/task';

const createTask = async (request: CreateTaskData) => {
  return await $api.post<Task>('/tasks', request);
};

const getAllTask = async () => {
  return await $api.get<Task[]>('/tasks');
};

const removeTask = async (taskId: string) => {
  return $api.delete<string>(`/tasks/${taskId}`);
};

const updateTask = async (updatedTaskData: Task) => {
  return $api.put<Task>(`/tasks/${updatedTaskData._id}`, updatedTaskData);
};

export const taskService = {
  createTask,
  getAllTask,
  removeTask,
  updateTask,
};
