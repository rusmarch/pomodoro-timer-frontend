import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsCircle } from 'react-icons/bs';
import TimerIcon from '@mui/icons-material/Timer';

import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';
import {
  selectCurrentTask,
  removeTask,
  setCurrentTask,
  updateTask,
  complete,
} from 'src/features/tasks/task-slice';
import {
  selectIsWorking,
  selectIsBreak,
  selectSettings,
  startTrackingTask,
} from 'src/features/timer/timer-slice';

import { Task } from 'src/types/task';
import { TrackTaskButton } from 'src/components/task/track-task-button';

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const isWorking = useAppSelector(selectIsWorking);
  const isBreak = useAppSelector(selectIsBreak);
  const currentTask = useAppSelector(selectCurrentTask);
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const isTaskTracking =
    currentTask !== null &&
    '_id' in currentTask &&
    currentTask._id === task._id &&
    isWorking &&
    !isBreak;

  const completeTask = async () => {
    const updatedTask = { ...task, complete: !task.complete };
    await dispatch(updateTask(updatedTask));
    dispatch(complete(updatedTask));
  };

  const trackTask = () => {
    dispatch(startTrackingTask());
    dispatch(setCurrentTask(task));
  };

  const onRemove = (id: string) => {
    dispatch(removeTask(id));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1,
        px: 2,
        py: 1,
        borderRadius: 2,
        backgroundColor: 'primary.main',
        boxShadow: '0px 3px 6px rgba(0,0, 0, 0.16)',
      }}
    >
      <Stack display="flex" direction="row">
        <Checkbox
          checked={task.complete}
          onChange={completeTask}
          icon={<BsCircle size="20px" />}
          checkedIcon={<CheckCircleIcon color="success" />}
          disableRipple
          sx={{ p: 0.5 }}
        />
        <TrackTaskButton isTaskTracking={isTaskTracking} onTrack={trackTask} />
        <Box flexDirection="column" alignContent="center">
          <Typography
            variant="subtitle1"
            sx={task.complete ? { textDecoration: 'line-through' } : {}}
          >
            {task.title}
          </Typography>
          {(task.workedTime || task.estimatedTime) > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.5}
            >
              {task.workedTime > 0 && (
                <>
                  <TimerIcon color="error" sx={{ fontSize: 16 }} />
                  <Typography fontSize={13}>
                    &zwj;{task.workedTime / settings.pomodoroTime}
                  </Typography>
                </>
              )}
              {task.workedTime > 0 && task.estimatedTime > 0 && (
                <Typography>/</Typography>
              )}
              {task.estimatedTime > 0 && (
                <>
                  <TimerIcon color="disabled" sx={{ fontSize: 16 }} />
                  <Typography fontSize={13} color="disabled">
                    &zwj;{task.estimatedTime / settings.pomodoroTime}
                  </Typography>
                </>
              )}
            </Stack>
          )}
        </Box>
      </Stack>
      <IconButton onClick={() => onRemove(task._id)}>
        <RiDeleteBinLine size="20px" />
      </IconButton>
    </Card>
  );
};
