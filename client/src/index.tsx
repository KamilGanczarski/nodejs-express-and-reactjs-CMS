import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Import pages
import App from './App';
import Home from './views/Home';
import About from './views/About';
import Login from './views/Login';
import SetOwnPassword from './views/SetOwnPassword';
import Error from './views/Error';
import AdminRoute from './views/admin/AdminRoute';
import AdminHome from './views/admin/Home';
import Cooperators from './views/admin/Cooperators';
import Customers from './views/admin/Customers';
import EditUser from './views/admin/EditUser';
import Calendar from './views/admin/Calendar';
import Pages from './views/admin/Pages';
import EditPage from './views/admin/EditPage';

// Import styles
import './sassStyles/app.scss';
import './fontello/css/fontello.css';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />
      },
      {
        path: '/lets-meet',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/change-password',
        element: <SetOwnPassword />
      },
      {
        path: '/admin',
        element: <AdminRoute />,
        children: [
          // Home page
          {
            path: `/admin/home`,
            element: <AdminHome />
          },
          // Cooperators
          {
            path: `/admin/cooperators`,
            element: <Cooperators />
          },
          // Customers
          {
            path: `/admin/customers`,
            element: <Customers />
          },
          // Edit user (admin / cooperator)
          {
            path: `/admin/edit-user`,
            element: <EditUser />
          },
          // Edit user with id (admin / cooperator)
          {
            path: `/admin/edit-user/:propsUserId`,
            element: <EditUser />
          },
          // Calendar
          {
            path: `/admin/calendar`,
            element: <Calendar />
          },
          // Pages
          {
            path: `/admin/pages`,
            element: <Pages />
          },
          // Edit page
          {
            path: `/admin/edit-page/:url`,
            element: <EditPage />
          },
          // 404 page
          {
            path: `/admin/*`,
            element: <Error />
          }
        ]
      },
      // 404 page
      {
        path: '/*',
        element: <Error />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
