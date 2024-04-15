import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
// import Button from '@mui/material/Button';
// import GoogleIcon from '@mui/icons-material/Google';
// import { FaFacebookF } from "react-icons/fa";
// import TwitterIcon from '@mui/icons-material/Twitter';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';

import { toast } from 'react-toastify';
import {
   selectUser,
   selectIsAuth,
   selectIsLoading,
   selectIsError,
   selectMessage,
   reset,
   login
} from '../features/auth/authSlice';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';

// import { Spinner } from '../components/Spinner';

type FormData = {
   email: string,
   password: string,
};

export const AuthForm = () => {

   const [formData, setFormData] = useState<FormData>({
      email: '',
      password: '',
   });
   const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

   const user = useAppSelector(selectUser);
   const isAuth = useAppSelector(selectIsAuth);
   const isLoading = useAppSelector(selectIsLoading);
   const isError = useAppSelector(selectIsError);
   const message = useAppSelector(selectMessage);
   const dispatch = useAppDispatch();
   // const { email, password } = formData;

   useEffect(() => {
      if (isError) {
         toast.error(message);
      }
      // Redirect when logged in (if it isAuth)
      if (isAuth || user) {
         // navigate('/tasks')
      }
      dispatch(reset());
   }, [isError, isAuth, user, message, dispatch])


   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   }

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(login(formData));
   }

   if (isLoading) {
      return /* <Spinner /> */;
   }

   return (
      <>
         <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: 1, backgroundColor: 'primary.main' }}
         >
            <Card sx={{ p: 5, width: 1, maxWidth: 420, /* backgroundColor: 'primary' */ }} >

               <Typography variant="h4">Sign In</Typography>
               <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                  Don’t have an account?
                  <Link color="info" variant="subtitle2" underline="hover" sx={{ ml: .5 }}>
                     Get started
                  </Link>
               </Typography>

               {/* <Stack direction="row" spacing={2}>
                     <Button
                        fullWidth
                        size="large"
                        color="inherit"
                        variant="outlined"
                     // sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                     >
                        <GoogleIcon color="error" />
                     </Button>

                     <Button
                        fullWidth
                        size="large"
                        color="inherit"
                        variant="outlined"
                     // sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                     >
                        <FaFacebookF size={20} color="#2196f3" />
                     </Button>

                     <Button
                        fullWidth
                        size="large"
                        color="inherit"
                        variant="outlined"
                     // sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                     >
                        <TwitterIcon color="info" />
                     </Button>
                  </Stack> */}

               <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                     OR
                  </Typography>
               </Divider>

               <form onSubmit={onSubmit}>
                  <Stack spacing={3}>
                     <TextField name="email" label="Email address" onChange={onChange} />

                     <TextField
                        name="password"
                        label="Password"
                        onChange={onChange}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="end">
                                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword
                                       ? <VisibilityIcon color='disabled' />
                                       : <VisibilityOffIcon color='disabled' />}
                                 </IconButton>
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                     <Link color="info" variant="subtitle2" underline="hover">
                        Forgot password?
                     </Link>
                  </Stack>

                  <LoadingButton
                     fullWidth
                     size="large"
                     type="submit"
                     variant="contained"
                     color="primary"
                     onClick={() => onSubmit}
                  >
                     Login
                  </LoadingButton>

               </form>
            </Card>
         </Stack>
      </>
   );
}

