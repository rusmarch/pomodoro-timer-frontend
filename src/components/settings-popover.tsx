import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
  selectSettings,
  setTimerSettings,
  selectIsWorking,
  selectIsPaused,
} from '../features/timer/timerSlice';

import { usePopover } from '../hooks/use-popover';
import { TimerSettings } from '../types/timer';
import { CustomPopover } from './custom-popover/custom-popover';

// ----------------------------------------------------------------------

export const SettingsPopover = () => {

  const settings = useAppSelector(selectSettings);
  const isWorking = useAppSelector(selectIsWorking);
  const isPaused = useAppSelector(selectIsPaused);
  const dispatch = useAppDispatch();
  const popover = usePopover();

  const settingsDisabled = isWorking || isPaused;

  const settingsList = [
    {
      name: 'pomodoroTime' as keyof TimerSettings,
      label: 'Pomodoro duration',
      value: settings.pomodoroTime,
    },
    {
      name: 'breakTime' as keyof TimerSettings,
      label: 'Break duration',
      value: settings.breakTime,
    },
  ];

  const updateSettings = (
    key: keyof TimerSettings,
    type: 'increment' | 'decrement'
  ) => {
    const value = type === 'increment' ? settings[key] + 1 : settings[key] - 1;
    const updatedSettings = { ...settings, [key]: value };
    dispatch(setTimerSettings(updatedSettings));

    if (!settingsDisabled) {
      // setDisplayTime(updatedSettings.pomodoroTime);
    }

    localStorage.setItem('timerSettings', JSON.stringify(updatedSettings));
  };


  return (
    <>
      <IconButton
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <SettingsOutlinedIcon color='error' />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        anchorEl={popover.open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{ width: 250 }}
      >
        <Stack sx={{ pl: 1.5, py: 1, backgroundColor: 'primary.main' }} >
          <Box>
            <Typography variant="subtitle1">Timer Settings</Typography>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Change working or brake time setttings here
          </Typography> */}
          </Box>

          <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

          <Stack spacing={1}>

            {settingsList.map((setting) => (
              <Stack
                key={setting.name}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {setting.label}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <IconButton
                    onClick={() => updateSettings(setting.name, 'decrement')}
                    disabled={settingsDisabled}
                    color='error'
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      px: .5,
                      py: 0,
                      // color: 'green',
                      // border: 2,
                      // borderRadius: 2,
                      // borderColor: 'text.secondary'
                    }}
                    color="text.secondary"
                  >
                    {setting.value}
                  </Typography>

                  <IconButton
                    onClick={() => updateSettings(setting.name, 'increment')}
                    disabled={settingsDisabled}
                    color='error'
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>

              </Stack>
              // </MenuItem>
            ))}
          </Stack>

        </Stack>
      </CustomPopover >
    </>
  );
};
