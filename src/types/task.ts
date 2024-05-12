export type Task = {
   _id: string
   user: string,
   title: string, 
   complete: boolean,
   workedTime: number,
   estimatedTime: number,
   __v?: number,
   tags: [] | string[],
};

export type TaskData = {
   title: string,
   estimatedTime?: number,
};

export type DeleteResponse = {
   success: boolean
};