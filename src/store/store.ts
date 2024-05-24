import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taskSlice from 'src/features/tasks/task-slice';
import timerSlice from 'src/features/timer/timer-slice';
import authSlice from 'src/features/auth/auth-slice';

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
    timer: timerSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
