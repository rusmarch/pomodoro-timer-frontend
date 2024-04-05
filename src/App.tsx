import { useEffect } from 'react';
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { checkAuth } from './features/auth/authSlice';
import { useAppDispatch } from './hooks/redux-hooks';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Header } from './components/Header';
import { PrivateRoute } from './components/PrivateRoute';

import { Tasks } from './pages/Tasks'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#181a1b',
    // },
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
        <BrowserRouter>
          <div className='container'>
            <Header />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/tasks' element={<PrivateRoute />}>
                <Route path='/tasks' element={<Tasks />} />
              </Route>
            </Routes>
          </div>

          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
