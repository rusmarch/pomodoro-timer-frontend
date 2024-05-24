import { useState, MouseEvent } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TimerIcon from '@mui/icons-material/Timer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { PomodoroAmountValue } from 'src/components/task/add-task-form';

type Props = {
  pomodoroAmount: number;
  setPomodoroAmount: (value: PomodoroAmountValue) => void;
};

export const PomodoroCounter = ({
  pomodoroAmount,
  setPomodoroAmount,
}: Props) => {
  const [isCounterShowed, setIsCounterShowed] = useState<boolean>(false);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {pomodoroAmount <= 5 ? (
        Array.from({ length: 5 }, (_, index) => (
          <IconButton
            key={index}
            onMouseDown={handleMouseDown}
            onClick={() => setPomodoroAmount(index + 1)}
            sx={{ px: 0.2 }}
          >
            <TimerIcon color={index < pomodoroAmount ? 'error' : 'disabled'} />
          </IconButton>
        ))
      ) : (
        <IconButton onMouseDown={handleMouseDown} sx={{ px: 0 }}>
          <TimerIcon color="error" />
        </IconButton>
      )}
      <IconButton
        onMouseDown={handleMouseDown}
        onClick={() => setIsCounterShowed((prev) => !prev)}
        disabled={pomodoroAmount > 5}
        sx={{ px: 0 }}
      >
        <ChevronRightIcon />
      </IconButton>
      {isCounterShowed && (
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <IconButton
            onClick={() => setPomodoroAmount('decrement')}
            onMouseDown={handleMouseDown}
            color="error"
            sx={{ px: 1 }}
          >
            <RemoveCircleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ px: 0.5, py: 0 }} color="text.secondary">
            {pomodoroAmount}
          </Typography>
          <IconButton
            onClick={() => setPomodoroAmount('increment')}
            onMouseDown={handleMouseDown}
            color="error"
            sx={{ px: 1 }}
          >
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}
    </>
  );
};
