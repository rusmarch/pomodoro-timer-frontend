import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

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

import {
  selectUser,
  selectIsAuth,
  selectIsError,
  selectMessage,
  reset,
  register,
} from 'src/features/auth/auth-slice';
import { useAppSelector, useAppDispatch } from 'src/hooks/redux-hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { RegisterData, RegisterFormData } from 'src/types/user';

type Props = {
  onToggleForm: VoidFunction;
};

export const RegisterForm = ({ onToggleForm }: Props) => {
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);
  const isError = useAppSelector(selectIsError);
  const message = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();
  const showPassword = useBoolean(false);
  const showPassword2 = useBoolean(false);

  const registerUserSchema = Yup.object().shape({
    name: Yup.string()
      .required('Username is required')
      .matches(/^[\w.@+-]+$/, 'Invalid username format')
      .max(150, 'Username must be at most 150 characters')
      .min(2, 'Username must be at least 2 character'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address')
      .min(3, 'Email must be at least 3 character')
      .max(254, 'Email must be at most 254 characters'),
    password: Yup.string()
      .required('Password is required')
      .max(128, 'Password must be at most 128 characters')
      .min(4, 'Password must be at least 4 character'),
    password2: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(registerUserSchema),
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

  const onSubmit = methods.handleSubmit((formData: RegisterFormData) => {
    const { name, email, password } = formData;
    const registerData: RegisterData = { name, email, password };
    dispatch(register(registerData));
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
          <Typography variant="h4">Sign Up</Typography>
          <Typography variant="body2" sx={{ my: 2 }}>
            Already have an account?
            <Link
              variant="subtitle2"
              underline="hover"
              sx={{ ml: 0.5, color: 'blue' }}
              onClick={() => onToggleForm()}
            >
              Sign In
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }} />

          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              <TextField
                {...methods.register('name')}
                label="Your name"
                error={!!methods.formState.errors.name}
                helperText={methods.formState.errors.name?.message}
              />
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
                      <IconButton
                        onClick={() => showPassword.onToggle()}
                        edge="end"
                      >
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

              <TextField
                {...methods.register('password2')}
                label="Confirm your password"
                error={!!methods.formState.errors.password2}
                helperText={methods.formState.errors.password2?.message}
                type={showPassword2.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => showPassword2.onToggle()}
                        edge="end"
                      >
                        {showPassword2.value ? (
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
              Register
            </LoadingButton>
          </form>
        </Card>
      </Stack>
    </>
  );
};
