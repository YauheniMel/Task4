import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPageContainer from './pages/LoginPage/LoginPageContainer';
import RegisterPageContainer from './pages/RegisterPage/RegisterPageContainer';
import useAuth from './hooks/useAuth';
import MainPageContainer from './pages/MainPage/MainPageContainer';
import checkLocalStorage from './services/checkLocalStorage';

function App() {
  const { isAuth } = useAuth(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(checkLocalStorage() ? '/home' : '/login');
  }, [isAuth]);

  return (
    <div className="App">
      <Routes>
        {/* <Route
          path="/"
          element={isAuth ? <Navigate to="/home" /> : <Navigate to="/login" />}
        /> */}
        <Route path="login" element={<LoginPageContainer />} />
        <Route path="signup" element={<RegisterPageContainer />} />
        <Route path="home" element={<MainPageContainer />} />
      </Routes>
    </div>
  );
}

export default App;
