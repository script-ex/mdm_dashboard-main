import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Dashboard')));

// Applications

const MyDiversityManager = Loader(
  lazy(() => import('src/content/applications/MyDiversityManager'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

const MDMApplication = Loader(
  lazy(() => import('src/applications/mdm/src/App'))
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

// Auth

const AuthSignIn = Loader(lazy(() => import('src/content/pages/Auth/SignIn')));

const AuthSignUp = Loader(lazy(() => import('src/content/pages/Auth/SignUp')));

// Organization

const OrganizationOverview = Loader(
  lazy(() => import('src/content/pages/Organization/Overview'))
);

const OrganizationAction = Loader(
  lazy(() => import('src/content/pages/Organization/Action'))
);

// License Purchase

const LicensePurchaseOverview = Loader(
  lazy(() => import('src/content/pages/LicensePurchase/Overview'))
);

const LicensePurchaseAction = Loader(
  lazy(() => import('src/content/pages/LicensePurchase/Action'))
);

// User

const UserOverview = Loader(
  lazy(() => import('src/content/pages/User/Overview'))
);

const UserAction = Loader(lazy(() => import('src/content/pages/User/Action')));
const MDMApplicationElement = <MDMApplication />;
const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/auth/sign-in" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            element: <AuthSignIn />
          },
          {
            path: 'sign-up',
            element: <AuthSignUp />
          }
          // {
          //   path: 'invitation',
          //   element:
          // }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'surveys',
    element: <SidebarLayout />,
    children: [
      {
        path: 'mdm/:mdmId',
        element: MDMApplicationElement,
        children: [
          {
            path: '*',
            element: MDMApplicationElement
          }
        ]
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="my-status" replace />
      },
      {
        path: 'my-status',
        element: <Crypto />
      },
      {
        path: 'mdm',
        element: <MyDiversityManager />
      },
      {
        path: 'organization',
        children: [
          {
            path: '',
            element: <Navigate to="overview" replace />
          },
          {
            path: 'overview',
            element: <OrganizationOverview />
          },
          {
            path: 'new',
            element: <OrganizationAction />
          }
        ]
      },
      {
        path: 'license-purchase',
        children: [
          {
            path: '',
            element: <Navigate to="overview" replace />
          },
          {
            path: 'overview',
            element: <LicensePurchaseOverview />
          },
          {
            path: 'new',
            element: <LicensePurchaseAction />
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            element: <Navigate to="overview" replace />
          },
          {
            path: 'overview',
            element: <UserOverview />
          },
          {
            path: 'new',
            element: <UserAction />
          }
        ]
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="profile/details" replace />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  }
];

export default routes;
