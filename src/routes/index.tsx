import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { PrivateRoute } from '../HOC/PrivateRoute';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { ROUTES_APP } from '../constants/routes';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const AppRoutes = () => (
  <Routes>
    <Route
      path={ROUTES_APP.root}
      element={
        <PrivateRoute>
          <MainPage />
        </PrivateRoute>
      }
    />
    <Route path={ROUTES_APP.login} element={<LoginPage />} />
    <Route path={ROUTES_APP.signup} element={<SignupPage />} />
    <Route path={ROUTES_APP.notFound} element={<NotFoundPage />} />
  </Routes>
);
