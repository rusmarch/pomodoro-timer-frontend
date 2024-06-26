import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { selectCurrentTask, updateTask } from 'src/features/tasks/task-slice';
import {
  selectSecondsLeft,
  selectIsBreak,
  selectIsWorking,
  selectIsPaused,
  startPause,
  stop,
  selectSettings,
} from 'src/features/timer/timer-slice';
import { useTimeDisplay } from 'src/hooks/use-time-display';
import { TimerButton } from 'src/components/timer/timer-button';

const red = '#f54e4e';
const blue = '#3399ff';

export const Timer = () => {
  const secondsLeft = useAppSelector(selectSecondsLeft);
  const currentTask = useAppSelector(selectCurrentTask);
  const isBreak = useAppSelector(selectIsBreak);
  const isWorking = useAppSelector(selectIsWorking);
  const isPaused = useAppSelector(selectIsPaused);
  const settings = useAppSelector(selectSettings);

  const { timerTime, percentage } = useTimeDisplay();
  const dispatch = useAppDispatch();

  const onStop = () => {
    if (currentTask && 'workedTime' in currentTask) {
      const totalTime = settings.pomodoroTime - secondsLeft;
      const updatedTask = {
        ...currentTask,
        workedTime: currentTask.workedTime + totalTime,
      };
      dispatch(updateTask(updatedTask));
    }
    dispatch(stop());
  };

  return (
    <Stack alignItems="center">
      {currentTask && 'workedTime' in currentTask && (
        <h3>Current task: {currentTask.title}</h3>
      )}
      <h3>{isWorking ? 'WORKING...' : 'Stopped'}</h3>
      <h3>Status Timer: {!isBreak ? 'Pomodoro' : 'Break'}</h3>
      <Stack width={200} height={200} sx={{ m: 2 }}>
        <CircularProgressbar
          value={percentage}
          text={`${timerTime}`}
          styles={buildStyles({
            strokeLinecap: 'butt',
            pathColor: isBreak ? blue : red,
            trailColor: 'rgba(255,255,255, 0.2)',
            pathTransitionDuration: 0.3,
          })}
        ></CircularProgressbar>
      </Stack>

      <TimerButton
        isWorking={isWorking}
        isPaused={isPaused}
        isBreak={isBreak}
        onStartPause={() => dispatch(startPause())}
        onStop={onStop}
      />
    </Stack>
  );
};
