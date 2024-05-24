import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import TimerIcon from '@mui/icons-material/Timer';

type TrackButtonProps = {
  isTaskTracking: boolean;
  onTrack: () => void;
};

export const TrackTaskButton = ({
  onTrack,
  isTaskTracking,
}: TrackButtonProps) => {
  const iconStyle = { fontSize: 30 };

  return (
    <IconButton color="error" onClick={isTaskTracking ? undefined : onTrack}>
      {isTaskTracking ? (
        <TimerIcon sx={iconStyle} />
      ) : (
        <PlayCircleIcon sx={iconStyle} />
      )}
    </IconButton>
  );
};
