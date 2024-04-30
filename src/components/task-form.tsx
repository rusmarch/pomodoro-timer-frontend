import { FormEvent, useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';

import { useAppDispatch } from '../hooks/redux-hooks';
import { createNewTask } from '../features/tasks/taskSlice';

export const TaskForm = () => {

   const dispatch = useAppDispatch();

   const [title, setTitle] = useState<string>('');

   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const taskData = { title: title }
      dispatch(createNewTask(taskData));
      // .unwrap()
      // .then((res) => console.table(res))
      setTitle('');
   }

   return (
      <Stack mb={2}>
         <form onSubmit={onSubmit}>
            <TextField
               fullWidth
               type="text"
               variant="outlined"
               color='error'
               placeholder="Add task title..."
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start" >
                        <AddIcon color="error" />
                     </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
               }}
            />
         </form>
      </Stack>
   )
}

// =================================================================================