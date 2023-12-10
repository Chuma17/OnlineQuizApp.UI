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
import SingleAdminQuiz from './views/Quiz/SingleAdminQuiz';
import QuizRecords from './views/QuizSettings/QuizRecords';
import QuizResult from './views/QuizSettings/QuizResults';
import EditQuizDetails from './views/QuizSettings/EditQuizDetails';
import EditQuizImage from './views/QuizSettings/EditQuizImage';

//Admin Question
import AddQuestion from './views/Question/AddQuestion';
import AdminQuestionsInQuiz from './views/Question/AdminQuestionsInQuiz';
import SuperAdminQuestionsInQuiz from './views/Question/SuperAdminQuestionsInQuiz';

//Participant Quiz
import SingleQuiz from './views/ParticipantQuiz/SingleQuiz';
import TakeQuiz from './views/ParticipantQuiz/TakeQuiz';

//Participant Result
import ParticipantResult from './views/Result/ParticipantResult';

//Super Admin 
import ViewCategories from './views/SuperAdmin/ViewCategories';
import ViewAdmins from './views/SuperAdmin/ViewAdmins';
import ViewQuestionTypes from './views/SuperAdmin/ViewQuestionTypes';
import ViewUsers from './views/SuperAdmin/ViewUsers';
import SuperAdminPublished from './views/SuperAdmin/SuperAdminPublished';
import SingleSuperAdminQuiz from './views/SuperAdmin/SingleSuperAdminQuiz';
import SuperAdminQuizRecords from './views/QuizSettings/SuperAdminQuizRecords';
import SuperAdminUnpublished from './views/SuperAdmin/SuperAdminUnpublished';
import SuperAdminUserQuizzes from './views/SuperAdmin/SuperAdminUserQuizzes';

//Views
import LandingPage from './views/Home/LandingPage';

import { Editor } from '@tinymce/tinymce-react'

const ROLES = {
  'Admin': "Admin",
  'SuperAdmin': "SuperAdmin",
  'Participant': "Participant",
}

function checkLocalStorageExpiration() {
  const userDetailsTimestamp = parseInt(localStorage.getItem('userDetailsTimestamp'));
  const days = 9;
  const hours = 23;
  const minutes = 50;

  const expirationTime = ((days * 24 + hours) * 60 + minutes) * 60 * 1000;


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

        <Route index element={<LandingPage />} /> {/* Added index attribute */}
        {/* public routes */}

        <Route path="/" exact element={<LandingPage />} />
        {/* <Route path="/landing-page" element={<LandingPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resend-confirmation-link" element={<ResendLink />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/single-participant-quiz/:id" element={<SingleQuiz />} />
        <Route path="/ongoing-quiz/:id" element={<TakeQuiz />} />

        {/* protected routes */}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.SuperAdmin, ROLES.Participant]} />}>
          <Route path="/change-names" element={<ChangeNames />} />
          <Route path="/change-username" element={<ChangeUsername />} />
          <Route path="/change-email" element={<ChangeEmail />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/two-factor-authentication" element={<TwoFactorAuthentication />} />
          <Route path="/profile-picture" element={<ProfilePicture />} />
          <Route path="/participant-result" element={<ParticipantResult />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/admin-quizzes" element={<AdminQuizzes />} />
          <Route path="/admin-published-quizzes" element={<AdminPublished />} />
          <Route path="/admin-unpublished-quizzes" element={<AdminUnpublished />} />
          <Route path="/add-questions-to-bank" element={<AddQuestion />} />
          <Route path="/single-admin-quiz/:id" element={<SingleAdminQuiz />} />
          <Route path="/view-admin-questions-in-quiz/:id" element={<AdminQuestionsInQuiz />} />
          <Route path="/view-quiz-records/:id" element={<QuizRecords />} />
          <Route path="/quiz-result/:id/*" element={<QuizResult />} />
          <Route path="/edit-quiz-details/*" element={<EditQuizDetails />} />
          <Route path="/edit-quiz-image/*" element={<EditQuizImage />} />

        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.SuperAdmin]} />}>
          <Route path="/view-categories" element={<ViewCategories />} />
          <Route path="/view-admins" element={<ViewAdmins />} />
          <Route path="/view-questionTypes" element={<ViewQuestionTypes />} />
          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/superAdmin-published-quizzes/:id/*" element={<SuperAdminPublished />} />
          <Route path="/superAdmin-unpublished-quizzes/:id/*" element={<SuperAdminUnpublished />} />
          <Route path="/superAdmin-user-quizzes/:id" element={<SuperAdminUserQuizzes />} />
          <Route path="/single-super-admin-quiz/:id/*" element={<SingleSuperAdminQuiz />} />
          <Route path="/view-superAdmin-questions-in-quiz/:id/*" element={<SuperAdminQuestionsInQuiz />} />
          <Route path="/view-superAdmin-quiz-records/:id/*" element={<SuperAdminQuizRecords />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>

    </Routes>

  </>
}

export default App;