import Stack from '@mui/material/Stack';
import { useBoolean } from 'src/hooks/use-boolean';
import { LoginForm } from 'src/pages/login-form';
import { RegisterForm } from 'src/pages/register-form';

export const StartScreen = () => {
  const isLoginFormDisplay = useBoolean(true);

  return (
    <Stack alignItems="center">
      {isLoginFormDisplay.value ? (
        <LoginForm onToggleForm={isLoginFormDisplay.onToggle} />
      ) : (
        <RegisterForm onToggleForm={isLoginFormDisplay.onToggle} />
      )}
    </Stack>
  );
};
