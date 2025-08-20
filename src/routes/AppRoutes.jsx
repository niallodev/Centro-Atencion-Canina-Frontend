import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import OwnerPage from '../pages/OwnersPage';
import PrivateRoute from '../components/PrivateRoute'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>}/>
        <Route path="/owner" element={<PrivateRoute><OwnerPage /></PrivateRoute>}/>
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* Otras rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}
