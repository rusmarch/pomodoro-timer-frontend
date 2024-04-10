import { useEffect } from 'react';
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { checkAuth } from './features/auth/authSlice';
import { useAppDispatch } from './hooks/redux-hooks';

import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Home } from './pages/Home';
// import { Login } from './pages/Login';
// import { Register } from './pages/Register';
import { Header } from './components/Header';

import { Tasks } from './pages/Tasks'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#181a1b',
    }
  }
});

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={darkTheme} >
          <div className='container'>
            <Header />

            <Tasks />
          </div>

          <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
