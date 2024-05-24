import { useState } from 'react';

import Stack from '@mui/material/Stack';
import { LoginForm } from 'src/pages/login-form';
import { RegisterForm } from 'src/pages/register-form';

export const StartScreen = () => {
  const [formDisplay, setFormDisplay] = useState<boolean>(true);

  const showForm = (): void => {
    setFormDisplay((prev) => !prev);
  };

  return (
    <Stack alignItems="center">
      {formDisplay ? (
        <LoginForm onToggleForm={() => showForm()} />
      ) : (
        <RegisterForm onToggleForm={() => showForm()} />
      )}
    </Stack>
  );
};
