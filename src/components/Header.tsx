import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useAppSelector, /* useAppDispatch */ } from '../hooks/redux-hooks';
import { /* logout, reset, */ selectUser } from '../features/auth/authSlice';
import { AccountPopover } from './account-popover';
import { SettingsPopover } from './settings-popover';

export const Header = () => {

   const user = useAppSelector(selectUser);

   return (
      <AppBar>
         <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ px: 2, py: 1, backgroundColor: 'primary.main' }}
         >
            <Stack
               direction="row"
               spacing={1}
            >
               <div>
                  <AccountPopover />
               </div>

               <Box alignContent="center">
                  {user ? (
                     <>
                        <Typography variant="subtitle1" noWrap>
                           {user?.name}
                        </Typography>
                     </>) : (
                     <>
                        {/* <Link to='/login'>
                           <FaSignInAlt />Login
                        </Link>
                        <Link to='/register'>
                           <FaUser />Register
                        </Link> */}
                     </>
                  )}
               </Box>
            </Stack>

            <Stack
               spacing={2}
               direction="row"
            >
               <SettingsPopover />
            </Stack>

         </Stack>
      </AppBar>
   )
}
