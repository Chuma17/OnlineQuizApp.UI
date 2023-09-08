import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

//Components
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';

//Login
import Login from './views/Login&Reg/Login';

//Registration
import AdminRegistration from './views/Login&Reg/AdminRegistration';

//Views
import HomePage from './views/HomePage';
import Halls from './views/Halls';

const ROLES = {
  'Admin': "Admin",
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
        {/* public routes */}

        <Route path="/" exact element={<HomePage />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/halls" element={<Halls />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}                

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/create-admin" element={<AdminRegistration />} />        
        </Route>        

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>

    </Routes>
  </>
}

export default App;