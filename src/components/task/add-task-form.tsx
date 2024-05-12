import { FormEvent, useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { selectSettings } from '../../features/timer/timerSlice';
import { createNewTask } from '../../features/tasks/taskSlice';
import { PomodoroCounter } from './pomodoro-counter';

export type PomodoroAmountValue = 'increment' | 'decrement' | number;

export const AddTaskForm = () => {

   const settings = useAppSelector(selectSettings);
   const dispatch = useAppDispatch();
   const [title, setTitle] = useState<string>('');
   const [pomodoroAmount, setPomodoroAmount] = useState<number>(0);

   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const taskData = {
         title,
         estimatedTime: pomodoroAmount * settings.pomodoroTime,
      };
      dispatch(createNewTask(taskData));
      // .unwrap()
      // .then((res) => console.table(res))
      setTitle('');
      setPomodoroAmount(0);
   }

   const countPomodoro = (value: PomodoroAmountValue) => {
      if (typeof value === 'number') {
         setPomodoroAmount(value);
      } else {
         value === 'increment'
            ? setPomodoroAmount((prev) => ++prev)
            : pomodoroAmount !== 0 && setPomodoroAmount((prev) => --prev)
      }
   };

   return (
      <Stack mb={2}>
         <form onSubmit={onSubmit}>
            <TextField
               fullWidth
               type="text"
               variant="outlined"
               color='error'
               placeholder="Add task title and press Enter..."
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start" >
                        <AddIcon color="disabled" />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end" >
                        <PomodoroCounter
                           pomodoroAmount={pomodoroAmount}
                           setPomodoroAmount={countPomodoro}
                        />
                     </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
               }}
            />
         </form>
      </Stack>
   );
}
