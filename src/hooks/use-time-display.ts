import { useEffect, useRef, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
   selectSecondsLeft,
   selectIsWorking,
   selectSettings,
   selectIsBreak,
   stop,
   decrementSecondsLeft,
} from '../features/timer/timerSlice';
import {
   selectCurrentTask,
   // setCurrentTask,
   updateTask
} from '../features/tasks/taskSlice';

import { formatPopoverTime, formatTimerTime } from '../utils/format-time';

// ----------------------------------------------------------------------

type ReturnType = {
   timerTime: string,
   popoverTime: number,
   percentage: number,
};

export const useTimeDisplay = (isPopoverClosed?: boolean): ReturnType => {

   const secondsLeft = useAppSelector(selectSecondsLeft);
   const isBreak = useAppSelector(selectIsBreak);
   const isWorking = useAppSelector(selectIsWorking);
   const settings = useAppSelector(selectSettings);
   // const workedTime = useAppSelector(selectWorkedTime);
   const currentTask = useAppSelector(selectCurrentTask);
   const dispatch = useAppDispatch();

   // const initialTime = savedSettings.pomodoroTime ?? defaultSettings.pomodoroTime;
   const [popoverTime, setPopoverTime] = useState<number>(() => formatPopoverTime(secondsLeft));

   // figure out how exactly timerIntervalRef works
   const timerIntervalRef = useRef<number | null>(null);

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
               if (currentTask && 'totalTime' in currentTask) {
                  const workedTime = settings.pomodoroTime - secondsLeft;
                  const updatedTask = { ...currentTask, totalTime: currentTask.totalTime + workedTime }
                  dispatch(updateTask(updatedTask))
               }

               dispatch(stop());

               clearInterval(timerIntervalRef.current as number);
            }
         }
      }
      //When the Popover was CLOSED - START the timer.
      if (isPopoverClosed && timerIntervalRef.current !== null) {
         clearInterval(timerIntervalRef.current);
      }

      return () => clearInterval(timerIntervalRef.current as number);

   }, [
      secondsLeft,
      popoverTime,
      isBreak,
      isWorking,
      dispatch,
      isPopoverClosed,
      currentTask,
      // workedTime,
      settings,
   ]);

   let timerTime = formatTimerTime(secondsLeft);
   let totalTime: number = !isBreak ? settings.pomodoroTime : settings.breakTime;
   let percentage: number = (secondsLeft / totalTime) * 100;

   return {
      timerTime,
      popoverTime,
      percentage,
   };
};
