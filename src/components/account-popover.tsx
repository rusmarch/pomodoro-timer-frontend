// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
// import Stack from '@mui/material/Stack';
// import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// import { useAuthContext } from 'src/auth/hooks';

// import { varHover } from 'src/components/animate';

import { InitialsAvatar } from './initials-avatar';
import { usePopover } from '../hooks/use-popover';
import Popover from '@mui/material/Popover';
import { useAppSelector } from '../hooks/redux-hooks';
import { selectUser } from '../features/auth/authSlice';

// import { useSnackbar } from 'src/components/snackbar';
// import { useRouter } from 'src/routes/hooks';
// import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const AccountPopover = () => {

  const user = useAppSelector(selectUser);
  const popover = usePopover();

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

      <Popover
        open={!!popover.open}
        onClose={popover.onClose}
        anchorEl={popover.open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 'auto',
              overflow: 'inherit',
            },
          },
        }}
      >
        {/* <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.avatar?.title || 'No Name'}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.username}
          </Typography>
        </Box> */}
        <Typography>Settings</Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />


        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem> */}
      </Popover>
    </>
  );
}
