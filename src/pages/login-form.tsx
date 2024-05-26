import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';

import { toast } from 'react-toastify';
import {
  selectUser,
  selectIsAuth,
  selectIsError,
  selectMessage,
  reset,
  login,
} from 'src/features/auth/auth-slice';
import { useAppSelector, useAppDispatch } from 'src/hooks/redux-hooks';
import { LoginData } from 'src/types/user';
import { useBoolean } from 'src/hooks/use-boolean';

type Props = {
  onToggleForm: VoidFunction;
};

export const LoginForm = ({ onToggleForm }: Props) => {
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);
  const isError = useAppSelector(selectIsError);
  const message = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();
  const showPassword = useBoolean(false);

  const loginUserSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address')
      .min(3, 'Email must be at least 3 character')
      .max(254, 'Email must be at most 254 characters'),
    password: Yup.string()
      .required('Password is required')
      .max(128, 'Password must be at most 128 characters')
      .min(4, 'Password must be at least 4 character'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<LoginData>({
    resolver: yupResolver(loginUserSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect when logged in (if it isAuth)
    if (isAuth || user) {
      // navigate('/tasks')
    }
    dispatch(reset());
  }, [isError, isAuth, user, message, dispatch]);

  const onSubmit = methods.handleSubmit((formData: LoginData) => {
    dispatch(login(formData));
    methods.reset();
  });

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1, backgroundColor: 'primary.main' }}
      >
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4">Sign In</Typography>
          <Typography variant="body2" sx={{ my: 2 }}>
            Don't have an account?
            <Link
              variant="subtitle2"
              underline="hover"
              sx={{ ml: 0.5, color: 'blue' }}
              onClick={() => onToggleForm()}
            >
              Sign Up
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }} />

          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              <TextField
                {...methods.register('email')}
                label="Email address"
                error={!!methods.formState.errors.email}
                helperText={methods.formState.errors.email?.message}
              />

              <TextField
                {...methods.register('password')}
                label="Password"
                error={!!methods.formState.errors.password}
                helperText={methods.formState.errors.password?.message}
                type={showPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        {showPassword.value ? (
                          <VisibilityIcon color="disabled" />
                        ) : (
                          <VisibilityOffIcon color="disabled" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </LoadingButton>
          </form>
        </Card>
      </Stack>
    </>
  );
};
