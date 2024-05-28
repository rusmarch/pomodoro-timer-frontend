import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useAppSelector, useAppDispatch } from 'src/hooks/redux-hooks';
import {
  selectAllTasks,
  selectSearchQuery,
  // selectIsLoading,
  selectIsSuccess,
  getAllTask,
  reset,
} from 'src/features/tasks/task-slice';
// import { Spinner } from '../components/Spinner';
import { TaskItem } from 'src/components/task/task-item';
import { AddTaskForm } from 'src/components/task/add-task-form';
import { TimerPopover } from 'src/components/timer/timer-popover';
// import { SearchInput } from 'src/components/search-input';

export const TasksView = () => {
  const tasks = useAppSelector(selectAllTasks);
  const searchQuery = useAppSelector(selectSearchQuery);
  // const isLoading = useAppSelector(selectIsLoading);
  const isSuccess = useAppSelector(selectIsSuccess);
  const dispatch = useAppDispatch();
  const isCompletedTaskShowing = useBoolean(false);

  const hasCompletedTask = tasks?.some((task) => task.complete);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch]);

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const onSearch = (v: string) => {
  //    dispatch(setSearchQuery(v));
  // };

  const renderTaskList = (
    <Stack>
      {filteredTasks?.map(
        (task) => !task.complete && <TaskItem key={task._id} task={task} />
      )}
    </Stack>
  );

  const renderCompletedTaskList = (
    <div className="tickets">
      {tasks?.map(
        (task) => task.complete && <TaskItem key={task._id} task={task} />
      )}
    </div>
  );

  // if (isLoading) {
  //   return /* <Spinner /> */;
  // }
  return (
    <>
      <h1>Tasks List</h1>
      <AddTaskForm />
      {/* <SearchInput
            query={searchQuery}
            onSearch={onSearch}
            sx={{ mb: 2 }}
         /> */}
      <br />

      {tasks?.length ? (
        <>
          {renderTaskList}
          <br />
          {hasCompletedTask && (
            <button onClick={isCompletedTaskShowing.onToggle}>
              {`${isCompletedTaskShowing.value ? 'Hide' : 'Show'} completed tasks`}
            </button>
          )}

          {isCompletedTaskShowing.value && renderCompletedTaskList}
        </>
      ) : (
        <Typography variant="h4" sx={{ my: 2, color: 'text.disabled' }}>
          You have no tasks yet
        </Typography>
      )}

      <TimerPopover />
    </>
  );
};
