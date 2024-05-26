import { useEffect } from 'react';
import { useAppSelector } from 'src/hooks/redux-hooks';
import { selectUser } from 'src/features/auth/auth-slice';
import { useBoolean } from 'src/hooks/use-boolean';

export const useAuthStatus = () => {
  const user = useAppSelector(selectUser);
  const loggedIn = useBoolean();
  const checkingStatus = useBoolean(true);

  useEffect(() => {
    if (user) {
      loggedIn.onTrue();
    } else {
      loggedIn.onFalse();
    }

    checkingStatus.onFalse();
  }, [user, loggedIn, checkingStatus]);

  return { loggedIn, checkingStatus };
};
