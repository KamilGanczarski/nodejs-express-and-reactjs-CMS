import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import axios from 'axios';

// Backend settings
import { baseUrl } from '../../components/data';

// Import pages
import Home from './Home';
import Clients from './Clients';
import EditUser from './EditUser';
import Error from '../../pages/Error';

type Props = {};

export default function AdminRoute({}: Props) {
  const { path } = useRouteMatch();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ auth, setAuth ] = useState(false);

  const checkValidToken = async () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    await axios.get(`${baseUrl}/api/v1/auth/check-token`, {
        headers: {
          'Authorization': `${localStorage.token}`
        }
      })
      .then(res => {
        setAuth(true);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    document.title = "Admin"
    checkValidToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if no authorization
  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <Switch>
      {/* Home page */}
      <Route exact path={`${path}/home`} component={Home} />

      {/* Clients */}
      <Route exact path={`${path}/clients`} component={Clients} />

      {/* Edit user (admin / cooperator) */}
      <Route exact path={`${path}/edit-user`} component={EditUser} />

      {/* Edit user with id (admin / cooperator) */}
      <Route exact path={`${path}/edit-user/:id`} component={EditUser} />

      {/* Error */}
      <Route path={`${path}/*`} component={Error} />
    </Switch>
  );
}
