import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import OnlyfansAccount from './pages/OnlyfansAccount';
import DashboardPage from './pages/DasboardPage';
import ManagerSuite from './pages/ManagerSuite/index';
import EmployeeShifts from './pages/EmployeeShifts';
import ManageCreators from './pages/ManageCreators';
import Notification from './pages/Notification';
import HomePage from './pages/HomePageContent';
import ManageEmployees from './pages/ManageEmployees';
import SmartTags from './pages/Growth/SmartTags';
import AutoFollow from './pages/Growth/AutoFollow';
import ScanDetails from './pages/Growth/AutoFollow/ScanDetails';
import Settings from './pages/Settings';
import Growth from './pages/Growth';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import Scripts from './pages/Growth/Scripts';
import ProfilePromotion from './pages/Growth/ProfilePromotion';
import TrackingLinks from './pages/Growth/TrackingLinks';
import ShareForShare from './pages/ShareForShare';
import DiscoverCreators from './pages/ShareForShare/DiscoverCreators';
import InviteLink from './pages/ShareForShare/InviteLink';
import CreatePost from './pages/ShareForShare/InviteLink/CreatePost';
import useAuth from './hooks/useAuth';
import Requests from './pages/ShareForShare/Requests';
import TrialLinks from './pages/Growth/TrialLink';
import Register from './pages/Auth/register';
import Schedule from './pages/ShareForShare/Schedule';
import Analytics from './pages/Analytics';
import CreaterReports from './pages/Analytics/CreateReports';
import ChatterReports from './pages/Analytics/ChatterReports';
import FanReports from './pages/Analytics/FanReports';
import { useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';
import SetPassword from './pages/SetPassword/index';
import ResetPassword from './pages/ResetPassword/index';
import Accounting from './pages/Accounting';
import Invoicing from './pages/Accounting/Invoicing';
import Payroll from './pages/Accounting/Payroll';
import BookKeeping from './pages/Accounting/BookKeeping';
import ChatMessage from './pages/ChatScreen';
import ContentHub from './pages/ContentHub';
import Browser from './pages/Browser';
import { useLocation } from 'react-router-dom';

const ROUTES = [
  {
    path: '*',
    element: <Login />,
    pathName: 'Login',
  },
  {
    path: '/home',
    element: <HomePage />,
    pathName: 'Home Page',
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    pathName: 'Dashboard Page',
  },
  {
    path: '/manager-suite/:page',
    element: <ManagerSuite />,
    pathName: 'Manager Suite',
  },
  {
    path: '/of-account',
    element: <OnlyfansAccount />,
    pathName: 'Onlyfans Account Page',
  },
  {
    path: '/browser',
    element: <Browser />,
    pathName: 'Anty Browser',
  },
  {
    path: '/content-hub',
    element: <ContentHub />,
    pathName: 'Content Hub',
  },
  {
    path: '/employees-manage-shifts',
    element: <EmployeeShifts />,
    pathName: 'Employee shifts ui',
  },
  {
    path: '/creators',
    element: <ManageCreators />,
    pathName: 'Manage Creators',
  },
  {
    path: '/notification',
    element: <Notification />,
    pathName: 'Notification',
  },
  {
    path: '/employees-manage-employees',
    element: <ManageEmployees />,
    pathName: 'Manage Employees',
  },
  {
    path: 'analytics',
    element: <Analytics />,
    pathName: 'Analytics',
    nestedRoutes: [
      {
        path: 'create-reports',
        element: <CreaterReports />,
        pathName: 'Create Reports',
        nestedLink: '/analytics/create-reports',
      },
      {
        path: 'chatter-reports',
        element: <ChatterReports />,
        pathName: 'Chatter Reports',
        nestedLink: '/analytics/chatter-reports',
      },
      {
        path: 'fan-reports',
        element: <FanReports />,
        pathName: 'Fan Reports',
        nestedLink: '/analytics/fan-reports',
      },
    ],
  },
  {
    path: 'accounting',
    element: <Accounting />,
    pathName: 'Accounting',
    nestedRoutes: [
      {
        path: 'invoicing',
        element: <Invoicing />,
        pathName: 'Invoicing',
        nestedLink: '/accounting/invoicing',
      },
      {
        path: 'payroll',
        element: <Payroll />,
        pathName: 'Payroll',
        nestedLink: '/accounting/payroll',
      },
      {
        path: 'book-keeping',
        element: <BookKeeping />,
        pathName: 'Book Keeping',
        nestedLink: '/accounting/book-keeping',
      },
    ],
  },
  {
    path: 'growth',
    element: <Growth />,
    pathName: 'Growth',
    nestedRoutes: [
      {
        path: 'smart-tags',
        element: <SmartTags />,
        pathName: 'Smart Tags',
        nestedLink: '/growth/smart-tags',
      },
      {
        path: 'auto-follow',
        element: <AutoFollow />,
        pathName: 'Auto Follow',
        nestedLink: '/growth/auto-follow',
      },
      {
        path: 'auto-follow-scan-details',
        element: <ScanDetails />,
        pathName: 'Scan Details',
        nestedLink: '/growth/auto-follow-scan-details',
      },
      {
        path: 'scripts',
        element: <Scripts />,
        pathName: 'Scripts',
        nestedLink: '/growth/scripts',
      },
      {
        path: 'profile-promotion',
        element: <ProfilePromotion />,
        pathName: 'Profile Promotion',
        nestedLink: '/growth/profile-promotion',
      },
      {
        path: 'tracking-links',
        element: <TrackingLinks />,
        pathName: 'Tracking Links',
        nestedLink: '/growth/tracking-links',
      },
      {
        path: 'trial-links',
        element: <TrialLinks />,
        pathName: 'Trial Links',
        nestedLink: '/growth/trial-links',
      },
    ],
  },
  {
    path: 's4s',
    element: <ShareForShare />,
    pathName: 'Share For Share',
    nestedRoutes: [
      {
        path: 'discover-creators',
        element: <DiscoverCreators />,
        pathName: 'Discover Creators',
        nestedLink: '/s4s/discover-creators',
      },
      {
        path: 'invite-link',
        element: <InviteLink />,
        pathName: 'Invite Link',
        nestedLink: '/s4s/invite-link',
      },
      {
        path: 'invite-link-create-post',
        element: <CreatePost />,
        pathName: 'Create Post',
        nestedLink: '/s4s/invite-link-create-post',
      },
      {
        path: 'requests',
        element: <Requests />,
        pathName: 'Requests',
        nestedLink: '/s4s/requests',
      },
      {
        path: 'schedule',
        element: <Schedule />,
        pathName: 'Schedule',
        nestedLink: '/s4s/schedule',
      },
    ],
  },
  {
    path: '/settings',
    element: <Settings />,
    pathName: 'Settings',
  },
  {
    path: '/chatmessage',
    element: <ChatMessage />,
    pathName: 'chatmessage',
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

function AppRoutes() {
  const { isLogin } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.sendMessage('remove-browser-view');
    } else {
      console.error('Electron IPCRenderer not available');
    }
  }, [location]);
  return (
    <Routes>
      {isLogin ? (
        <>
          <Route
            path="/"
            element={<Navigate to="/manager-suite/notifications" />}
          />
          {ROUTES.map(({ path, element, nestedRoutes }) =>
            nestedRoutes ? (
              <Route key={path} path={path} element={element}>
                {nestedRoutes.map((nestedRoute) => (
                  <Route
                    key={nestedRoute.path}
                    path={nestedRoute.path}
                    element={nestedRoute.element}
                  />
                ))}
              </Route>
            ) : (
              <Route key={path} path={path} element={element} />
            )
          )}
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate-account/:id" element={<SetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
