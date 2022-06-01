import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import MainPage from './pages/MainPage/MainPage';
import LoginPageContainer from './pages/LoginPage/LoginPageContainer';
import RegisterPageContainer from './pages/RegisterPage/RegisterPageContainer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginPageContainer />} />
        <Route path="signup" element={<RegisterPageContainer />} />
        {/* <MainPage /> */}
      </Routes>
    </div>
  );
}

export default App;
