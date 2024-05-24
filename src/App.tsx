import { useEffect } from 'react';
import 'src/App.css';

import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { checkAuth, selectIsAuth } from 'src/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux-hooks';

import { Header } from 'src/components/header-component';
import { StartScreen } from 'src/components/start-screen';
import { TasksView } from 'src/components/task/tasks-view';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#181a1b',
    },
    // info: {
    //   main: '#1877F2'
    // },
  },
});

function App() {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Stack
          sx={{
            /* width: '100%', */ height: '100vh',
            justifyContent: 'center',
          }}
        >
          {!isAuth ? (
            <StartScreen />
          ) : (
            <>
              <Header />
              <TasksView />
            </>
          )}
        </Stack>

        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
