import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { ListItemIcon, MenuList } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { usePopover } from '../hooks/use-popover';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { selectUser, logout, reset } from '../features/auth/authSlice';

import { InitialsAvatar } from './initials-avatar';
import { CustomPopover } from './custom-popover/custom-popover';

// ----------------------------------------------------------------------

export const AccountPopover = () => {

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const popover = usePopover();

    const onLogout = (): void => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }
  
  return (
    <>
      <IconButton
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        {user && <InitialsAvatar title={user.name} />}
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        anchorEl={popover.open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              overflow: 'inherit',
            },
          },
        }}
      >

        <Stack sx={{ px: 1.5 }} >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" noWrap>
              {user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.email}
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuList>
            <MenuItem /* component={RouterLink} href={paths.dashboard.settings} onClick={onClose} */ >
              <ListItemIcon>
                <SettingsOutlinedIcon color='error' />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem /* component={RouterLink} href={paths.dashboard.account} onClick={onClose} */ >
              <ListItemIcon>
                <PersonOutlinedIcon color='error' />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon color='error' />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </MenuList>

        </Stack>
      </CustomPopover>
    </>
  );
}

