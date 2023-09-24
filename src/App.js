import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

//Components
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';

//Login & Registration
import Login from './views/Login&Reg/Login';
import AdminRegistration from './views/Login&Reg/AdminRegistration';
import UserRegistration from './views/Login&Reg/UserRegistration';

//Account
import ChangeNames from './views/AccountSettings/ChangeNames';
import ChangeUsername from './views/AccountSettings/ChangeUsername';
import ChangeEmail from './views/AccountSettings/ChangeEmail';
import ChangePassword from './views/AccountSettings/ChangePassword';
import TwoFactorAuthentication from './views/AccountSettings/TwoFactorAuthentication';
import ProfilePicture from './views/AccountSettings/ProfilePicture';

//Views
import HomePage from './views/HomePage';
import Halls from './views/Halls';

const ROLES = {
  'Admin': "Admin",
  'SuperAdmin': "SuperAdmin",
  'Participant': "Participant",
}

function checkLocalStorageExpiration() {
  const userDetailsTimestamp = parseInt(localStorage.getItem('userDetailsTimestamp'));
  const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds

  if (userDetailsTimestamp) {
    const currentTime = new Date().getTime();
    if (currentTime - userDetailsTimestamp > expirationTime) {
      localStorage.removeItem('userDetails');
      localStorage.removeItem('userDetailsTimestamp');
    }
  }
}

const App = () => {

  useEffect(() => {
    checkLocalStorageExpiration();

    // Set the interval to run the function every minute
    const interval = setInterval(checkLocalStorageExpiration, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return <>

    <Header />
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<HomePage />} /> {/* Added index attribute */}
        {/* public routes */}

        <Route path="/OnlineQuizApp.UI" exact element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/halls" element={<Halls />} />
        <Route path="/user-registration" element={<UserRegistration />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.SuperAdmin, ROLES.Participant]} />}>
          <Route path="/change-names" element={<ChangeNames />} />
          <Route path="/change-username" element={<ChangeUsername />} />
          <Route path="/change-email" element={<ChangeEmail />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/two-factor-authentication" element={<TwoFactorAuthentication />} />
          <Route path="/profile-picture" element={<ProfilePicture />} />

        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin]} />}>
          <Route path="/admin-registration" element={<AdminRegistration />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>

    </Routes>
  </>
}

export default App;