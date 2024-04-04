import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { Task } from "../types/task";
// import { Checkbox } from './Checkbox';
import { TrackTaskButton } from './track-task-button';
import { RiDeleteBinLine } from 'react-icons/ri'
import { BsCircle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import {
   selectCurrentTask,
   removeTask,
   setCurrentTask,
   updateTask,
   complete,
} from '../features/tasks/taskSlice';
import {
   selectIsWorking,
   selectIsBreak,
   startTrackingTask,
} from '../features/timer/timerSlice';

type Props = {
   task: Task
}

export const TaskItem = ({ task }: Props) => {

   const isWorking = useAppSelector(selectIsWorking);
   const isBreak = useAppSelector(selectIsBreak);
   const currentTask = useAppSelector(selectCurrentTask);
   const dispatch = useAppDispatch();

   const isTaskTracking = currentTask && ('_id' in currentTask)
      && currentTask._id === task._id && isWorking && !isBreak;

   const completeTask = async () => {
      const updatedTask = { ...task, complete: !task.complete };
      await dispatch(updateTask(updatedTask));
      dispatch(complete(updatedTask));
   }

   const trackTask = () => {
      dispatch(startTrackingTask());
      dispatch(setCurrentTask(task));
   };

   const onRemove = (id: string) => {
      dispatch(removeTask(id))
   };

   return (
      <Card
         variant="outlined"
         sx={{
            display: 'flex',
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
         }} >
         <Stack display="flex" direction="row">
            <Checkbox
               checked={task.complete}
               onChange={completeTask}
               icon={<BsCircle size='20px' />}
               checkedIcon={<CheckCircleIcon color="success" />}
               disableRipple
               sx={{ p: .5 }}
            />
            <TrackTaskButton isTaskTracking={isTaskTracking} onTrack={trackTask} />
            <div>{task.title}: <b>{task.totalTime}</b></div>
         </Stack>
         <Box>
            <RiDeleteBinLine
               className="task-delete"
               onClick={() => onRemove(task._id)}
            />
         </Box>
      </Card>
   );
};