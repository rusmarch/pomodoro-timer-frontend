import { useEffect } from 'react';
import './App.css'

import Stack from '@mui/material/Stack';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { checkAuth, selectIsAuth } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';

import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Home } from './pages/Home';
// import { Login } from './pages/Login';
// import { Register } from './pages/Register';
import { Header } from './components/header';
import { StartScreen } from './components/start-screen';
import { Tasks } from './pages/Tasks'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#181a1b',
    },
    // info: {
    //   main: '#1877F2'
    // },
  }
});

function App() {

  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={darkTheme} >
        <Stack sx={{ /* width: '100%', */ height: '100vh',  justifyContent: 'center' }}  >
          {!isAuth ? (<StartScreen />
          ) : (
            <>
              <Header />
              <Tasks />
            </>
          )}
        </Stack>

        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
