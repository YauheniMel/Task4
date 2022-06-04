import React, { Dispatch, FC, useEffect } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';
import LoginPageContainer from './pages/LoginPage/LoginPageContainer';
import RegisterPageContainer from './pages/RegisterPage/RegisterPageContainer';
import MainPageContainer from './pages/MainPage/MainPageContainer';
import { AppStateInterface } from './interfaces';
import 'react-toastify/dist/ReactToastify.css';
import checkSessionStorage from './services/checkSessionStorage';
import { loginUserAction } from './redux/actions/auth-action';

const App: FC<{ isAuth: boolean; login: () => void }> = function ({
  isAuth,
  login,
}) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    checkSessionStorage() ? login() : false;
  }, [isAuth]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#37474f',
        light: '#62727b',
      },
      secondary: {
        main: '#4fc3f7',
        light: '#a0e0fd',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="home" /> : <Navigate to="login" />}
          />
          <Route
            path="login"
            element={
              isAuth ? <Navigate to="/" replace /> : <LoginPageContainer />
            }
          />
          <Route
            path="signup"
            element={
              isAuth ? <Navigate to="/" replace /> : <RegisterPageContainer />
            }
          />
          <Route
            path="home"
            element={
              !isAuth ? <Navigate to="/" replace /> : <MainPageContainer />
            }
          />
        </Routes>
        <ToastContainer
          progressClassName="toastProgressBar"
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: AppStateInterface) => ({
  isAuth: state.auth.isAuth,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  login: () => dispatch(loginUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
