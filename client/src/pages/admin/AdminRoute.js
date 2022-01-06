import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  Redirect
} from 'react-router-dom'
import axios from 'axios';

// Import pages
import Home from './Home'
import Error from '../../pages/Error'

export default function AdminRoute() {
  const { path } = useRouteMatch();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ auth, setAuth ] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/v1/current_user');
      if (res.data.login) {
        setAuth(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
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
      <Route exact path={`${path}/home/`} component={Home} />

      {/* Error */}
      <Route path={`${path}/*`} component={Error} />
    </Switch>
  )
}
