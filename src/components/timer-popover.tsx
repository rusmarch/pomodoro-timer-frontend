import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CustomPopover } from './custom-popover/custom-popover';
import { usePopover } from '../hooks/use-popover';
import { Timer } from './task-timer';

import { useAppSelector } from '../hooks/redux-hooks';
import { selectIsBreak } from '../features/timer/timerSlice';
import { useTimeDisplay } from '../hooks/use-time-display';

export const TimerPopover = () => {

   const isBreak = useAppSelector(selectIsBreak);

   const popover = usePopover();
   const { popoverTime } = useTimeDisplay();

   return (
      <>
         <Stack
            onClick={popover.onOpen}

            sx={{
               position: 'fixed',
               bottom: 50, left: '50%',
               transform: 'translateX(-50%)',
            }}>
            <IconButton
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 120,
                  height: 120,
                  borderRadius: '20%',
                  backgroundColor: !isBreak ? 'red' : 'blue',
                  '&:hover': {
                     backgroundColor: !isBreak ? 'red' : 'blue',
                  },
               }}
            >
               <Typography variant="h3" color="#fff" >
                  {popoverTime}
               </Typography>

            </IconButton>
         </Stack >
         <CustomPopover
            open={popover.open}
            onClose={popover.onClose}
            anchorEl={popover.open}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            transformOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            sx={{
               height: '100%',
               width: '100%',
            }}
         >
            <Box
               sx={{
                  width: '100%',
                  height: '100%',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'primary.main'
               }}
            >
               <Timer />
            </Box>
         </CustomPopover >
      </>
   );
};
