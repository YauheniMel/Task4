import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        {/* <MainPage /> */}
      </Routes>
    </div>
  );
}

export default App;
