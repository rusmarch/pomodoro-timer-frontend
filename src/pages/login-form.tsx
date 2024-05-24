import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

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

type Props = {
  onToggleForm: VoidFunction;
};

export const LoginForm = ({ onToggleForm }: Props) => {
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);
  const isError = useAppSelector(selectIsError);
  const message = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData));
  };

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
                name="email"
                label="Email address"
                onChange={onChange}
              />

              <TextField
                name="password"
                label="Password"
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
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
