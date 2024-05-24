import { useEffect, useRef, useState } from 'react';

import { useAppSelector, useAppDispatch } from 'src/hooks/redux-hooks';
import {
  selectSecondsLeft,
  selectIsWorking,
  selectSettings,
  selectIsBreak,
  stop,
  decrementSecondsLeft,
} from 'src/features/timer/timer-slice';
import { selectCurrentTask, updateTask } from 'src/features/tasks/task-slice';

import { formatPopoverTime, formatTimerTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type ReturnType = {
  timerTime: string;
  popoverTime: number;
  percentage: number;
};

export const useTimeDisplay = (): ReturnType => {
  const secondsLeft = useAppSelector(selectSecondsLeft);
  const isBreak = useAppSelector(selectIsBreak);
  const isWorking = useAppSelector(selectIsWorking);
  const settings = useAppSelector(selectSettings);
  // const workedTime = useAppSelector(selectWorkedTime);
  const currentTask = useAppSelector(selectCurrentTask);
  const dispatch = useAppDispatch();

  // const initialTime = savedSettings.pomodoroTime ?? defaultSettings.pomodoroTime;
  const [popoverTime, setPopoverTime] = useState<number>(() =>
    formatPopoverTime(secondsLeft)
  );

  // figure out how exactly timerIntervalRef works
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerIntervalRef.current = setInterval(decrementTime, 1000);
    const leftMinutes = formatPopoverTime(secondsLeft);

    if (leftMinutes !== popoverTime) {
      setPopoverTime(leftMinutes);
    }

    function decrementTime() {
      if (isWorking) {
        if (secondsLeft > 0) {
          dispatch(decrementSecondsLeft());
        } else {
          if (currentTask && 'workedTime' in currentTask) {
            const totalTime = settings.pomodoroTime - secondsLeft;
            const updatedTask = {
              ...currentTask,
              workedTime: currentTask.workedTime + totalTime,
            };
            dispatch(updateTask(updatedTask));
          }

          dispatch(stop());

          clearInterval(timerIntervalRef.current as NodeJS.Timeout);
        }
      }
    }

    return () => clearInterval(timerIntervalRef.current as NodeJS.Timeout);
  }, [
    secondsLeft,
    popoverTime,
    isBreak,
    isWorking,
    currentTask,
    settings,
    dispatch,
    // workedTime,
  ]);

  const timerTime = formatTimerTime(secondsLeft);
  const totalTime: number = !isBreak
    ? settings.pomodoroTime
    : settings.breakTime;
  const percentage: number = (secondsLeft / totalTime) * 100;

  return {
    timerTime,
    popoverTime,
    percentage,
  };
};
