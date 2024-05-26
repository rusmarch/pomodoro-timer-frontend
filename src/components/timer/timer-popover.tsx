import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useAppSelector } from 'src/hooks/redux-hooks';
import { usePopover } from 'src/hooks/use-popover';
import { useTimeDisplay } from 'src/hooks/use-time-display';

import { selectIsBreak } from 'src/features/timer/timer-slice';

import { CustomPopover } from 'src/components/custom-popover/custom-popover';
import { Timer } from 'src/components/timer/task-timer';


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
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
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
          <Typography variant="h3" color="#fff">
            {popoverTime}
          </Typography>
        </IconButton>
      </Stack>
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
            backgroundColor: 'primary.main',
          }}
        >
          <Timer />
        </Box>
      </CustomPopover>
    </>
  );
};
