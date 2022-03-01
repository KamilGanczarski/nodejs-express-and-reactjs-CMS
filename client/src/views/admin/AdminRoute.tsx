import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

// Utils
import { TokenModel } from '../../utils/interfaces';
import {
  baseUrl,
  axiosHeaders,
  decodeToken,
  redirectTo
} from '../../utils/tokenAPI';

// Import pages
import Home from './Home';
import Cooperators from './Cooperators';
import Customers from './Customers';
import EditUser from './EditUser';
import Error from '../../views/Error';

type Props = {};

export default function AdminRoute({}: Props) {
  const { path } = useRouteMatch();
  const [ isLoading, setIsLoading ] = useState(true);

  const checkValidToken = async () => {
    // If token in local storage is set
    if (!localStorage.token) {
      redirectTo('/login');
    };

    await axios.get(`${baseUrl}/api/v1/auth/check-token`, axiosHeaders)
      .then(res => {
        const decodedToken: TokenModel = decodeToken(res.data.token);
        // Redirect to change-password if password expired
        if (decodedToken.user.changePassword) {
          redirectTo('/change-password');
        // Redirect to login if user hasn't specyfic permissions
        } else if (!['admin'].includes(decodedToken.user.role)) {
          redirectTo('/login');
        }
      })
      .catch(error => {
        redirectTo('/login');
      });

    setIsLoading(false);
  }

  useEffect(() => {
    document.title = "Admin"
    checkValidToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      {/* Home page */}
      <Route exact path={`${path}/home`} component={Home} />

      {/* Cooperators */}
      <Route exact path={`${path}/cooperators`} component={Cooperators} />

      {/* Customers */}
      <Route exact path={`${path}/customers`} component={Customers} />

      {/* Edit user (admin / cooperator) */}
      <Route exact path={`${path}/edit-user`} component={EditUser} />

      {/* Edit user with id (admin / cooperator) */}
      <Route exact path={`${path}/edit-user/:propsUserId`} component={EditUser} />

      {/* Error */}
      <Route path={`${path}/*`} component={Error} />
    </Switch>
  );
}
