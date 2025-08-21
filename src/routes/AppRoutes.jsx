import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import OwnerPage from '../pages/OwnersPage';
import PetsPage from '../pages/PetsPage';
import QuotesPage from '../pages/QuotesPage';
import ServicesDewormingPage from '../pages/ServicesDewormingPage';
import ServicesHairSalonPage from '../pages/ServicesHairSalonPage';
import ServicesMedicatedToiletsPage from '../pages/ServicesMedicatedToiletsPage';
import ServicesNormalBathroomsPage from '../pages/ServicesNormalBathroomsPage';
import PrivateRoute from '../components/PrivateRoute'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>}/>
        <Route path="/owner" element={<PrivateRoute><OwnerPage /></PrivateRoute>}/>
        <Route path="/pet" element={<PrivateRoute><PetsPage /></PrivateRoute>}/>
        <Route path="/quote" element={<PrivateRoute><QuotesPage /></PrivateRoute>}/>
        <Route path="/service/deworming" element={<PrivateRoute><ServicesDewormingPage /></PrivateRoute>}/>
        <Route path="/service/hairsalon" element={<PrivateRoute><ServicesHairSalonPage /></PrivateRoute>}/>
        <Route path="/service/medicatedtoilets" element={<PrivateRoute><ServicesMedicatedToiletsPage /></PrivateRoute>}/>
        <Route path="/service/normalbathrooms" element={<PrivateRoute><ServicesNormalBathroomsPage /></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}
