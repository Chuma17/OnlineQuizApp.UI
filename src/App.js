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
import ForgotPassword from './views/AccountSettings/ForgotPassword';
import ResetPassword from './views/AccountSettings/ResetPassword';
import ResendLink from './views/AccountSettings/ResendLink';

//Admin Quiz
import CreateQuiz from './views/Quiz/CreateQuiz';
import AdminQuizzes from './views/Quiz/AdminQuizzes';
import AdminPublished from './views/Quiz/AdminPublished';
import AdminUnpublished from './views/Quiz/AdminUnpublished';

//Admin Question
import AddQuestionToBank from './views/Question/AddQuestionToBank';
import AdminQuestionsInBank from './views/Question/AdminQuestionsInBank';
import AllQuestionsInBank from './views/Question/AllQuestionsInBank';

//Participant Quiz
import SingleQuiz from './views/ParticipantQuiz/SingleQuiz';

//Views
import HomePage from './views/HomePage';

const ROLES = {
  'Admin': "Admin",
  'SuperAdmin': "SuperAdmin",
  'Participant': "Participant",
}

function checkLocalStorageExpiration() {
  const userDetailsTimestamp = parseInt(localStorage.getItem('userDetailsTimestamp'));
  const expirationTime = 60 * 55 * 1000; // 1 hour in milliseconds

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

        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resend-confirmation-link" element={<ResendLink />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/single-participant-quiz/:id" element={<SingleQuiz />} />

        {/* protected routes */}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.SuperAdmin, ROLES.Participant]} />}>
          <Route path="/change-names" element={<ChangeNames />} />
          <Route path="/change-username" element={<ChangeUsername />} />
          <Route path="/change-email" element={<ChangeEmail />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/two-factor-authentication" element={<TwoFactorAuthentication />} />
          <Route path="/profile-picture" element={<ProfilePicture />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/admin-quizzes" element={<AdminQuizzes />} />
          <Route path="/admin-published-quizzes" element={<AdminPublished />} />
          <Route path="/admin-unpublished-quizzes" element={<AdminUnpublished />} />
          <Route path="/add-questions-to-bank" element={<AddQuestionToBank />} />
          <Route path="/view-admin-questions-in-bank" element={<AdminQuestionsInBank />} />
          <Route path="/view-all-questions-in-bank" element={<AllQuestionsInBank />} />
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