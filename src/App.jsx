import ProjectManagementPage from '@/features/project';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { AuthenticationPage } from './features/auth';
import { RequireAuth } from './features/auth/components/RequireAuth';
import Board from './features/board/Board';
import Dashboard from './features/dashboard';
import DeveloperDock from './features/dev-dock';
import { LandingPage } from './features/landingPage';
import MessagePage from './features/message';
import Account from './features/setting/component/account-page';
import Appearance from './features/setting/component/appearance-page';
import Notification from './features/setting/component/notification-page';
import Profile from './features/setting/component/profile-page';
import Notfoundpage from './layouts/404-page';
import { AppLayout } from './layouts/app-layout';
import { LandingAuthLayout } from './layouts/landing-auth-layout';
import { SettingLayout } from './layouts/setting-layout';
import { Welcome } from './test/Welcome';
// test
import { UsersList } from './test/users/userList';

// Routing from landing page to its child and sign in paage
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LandingAuthLayout />}>
      {/* Landing page and authentication routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthenticationPage />} />

      <Route element={<RequireAuth />}>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/users" element={<UsersList />} />

      <Route path="/user" element={<AppLayout />}>
        {/* Settings routes */}
        <Route path="/user/settings" element={<SettingLayout />}>
          <Route path="" element={<Navigate to="edit-profile" replace />} />
          <Route path="edit-profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="notification" element={<Notification />} />
          <Route path="*" element={<Notfoundpage />} />j
        </Route>

        {/* Dashboard route */}
        <Route path="/user/dashboard" element={<Dashboard />} />

        {/* Project route */}
        {/* Temporary Only */}
        <Route path="/user/notification" element={<ProjectManagementPage />} />

        {/* Board route */}
        <Route path="/user/board/:id" element={<Board />} />

        {/*Message route */}
        <Route path="/user/inbox" element={<MessagePage />} />
        {/* 404 route */}
        <Route path="*" element={<Notfoundpage />} />
      </Route>
      </Route>

      {/* 404 route */}
      <Route path="*" element={<Notfoundpage />} />
    </Route>
  )
);

function App() {
  // Global States
  const currentTheme = useSelector(state => state.currentTheme.value);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return <RouterProvider router={router} />;
}

export default App;
