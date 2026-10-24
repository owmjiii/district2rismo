import { Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoutes } from './components/ProtectedRoutes.jsx';
import { Snackbar } from './components/Snackbar.jsx';

import Home from './pages/Home.jsx';
import Destinations from './pages/Destinations.jsx';
import PlaceDetails from './pages/PlaceDetails.jsx';
import Account from './pages/Account.jsx';
import ConfirmPayment from './pages/ConfirmPayment.jsx';
import { LoginN } from './components/auth/LoginN.jsx';
import { SignUpN } from './components/auth/SignUpN.jsx';
import { HostN } from './pages/Host.jsx';
import { ConfirmBooking } from './pages/ConfirmBooking.jsx';
import { HostViewPropertyPage } from './pages/HostViewPropertyDetails.jsx'
import { HostMyProfilePage } from './pages/HostProfilePage.jsx'
import { HostEditPropertyPage } from './pages/HostEditProperty.jsx'
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Snackbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/destination" element={<Destinations />}/>
          <Route path="/resorts/:id" element={<PlaceDetails />}/>
          <Route path="/destinationdetails" element={<PlaceDetails />}/>
          <Route path="/pay" element={<ConfirmPayment />}/>
          <Route path="/login" element={<LoginN />} />
          <Route path="/signup" element={<SignUpN />} />

          <Route element={<ProtectedRoutes allowedRoles={["customer", "host"]} />}>
            <Route path="/account" element={<Account />}/>
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["host"]} />}>
            <Route path="/host/confirm-booking" element={<ConfirmBooking />} />
            <Route path="/host/view-property" element={<HostViewPropertyPage />} />
            <Route path="/host/edit-property" element={<HostEditPropertyPage />} />
            <Route path="/host/profile" element={<HostMyProfilePage />} />
            <Route path="/host/properties" element={<HostN initialSection="Properties" />} />
            <Route path="/host/*" element={<HostN />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<div>Admin Panel</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App