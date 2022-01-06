import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Error from './pages/Error'
import AdminRoute from './pages/admin/AdminRoute'

// Import components
import Navbar from './components/Navbar/Navbar'
import Preloader from './components/Preloader'

// Import styles
import './sassStyles/app.scss'
import './fontello/css/fontello.css'

function App() {
  return (
    <Router>
      <div id="theme" data-theme="dark">
        {/* Navbar */}
        <Navbar />

        {/* Preloader */}
        {/* <Preloader /> */}

        <Switch>
          {/* Home */}
          <Route exact path="/" component={Home} />

          {/* About */}
          <Route path="/about" component={About} />

          {/* Login */}
          <Route path="/login" component={Login} />

          {/* AdminRoute */}
          <Route path='/admin' component={AdminRoute} />

          {/* Error */}
          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
