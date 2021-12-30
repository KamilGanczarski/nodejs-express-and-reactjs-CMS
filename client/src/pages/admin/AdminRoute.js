import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'

// Import pages
import Home from './Home'
import Error from '../../pages/Error'

export default function AdminRoute() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      {/* Home page */}
      <Route exact path={path} component={Home} />
      <Route path={`${path}/home`} component={Home} />

      {/* Error */}
      <Route path={`${path}/*`} component={Error} />
    </Switch>
  )
}
