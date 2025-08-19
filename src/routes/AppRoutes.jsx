import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ForgotPassword from '../features/auth/ForgotPassword'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* Otras rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}
