export type Task = {
  _id: string;
  user: string;
  title: string;
  complete: boolean;
  workedTime: number;
  estimatedTime: number;
  __v?: number;
  tags: [] | string[];
};

export type CreateTaskData = {
  title: string;
  estimatedTime?: number;
};
