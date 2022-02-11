import React from 'react';
import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Import pages
import Home from './views/Home';
import About from './views/About';
import Login from './views/Login';
import Error from './views/Error';
import AdminRoute from './views/admin/AdminRoute';

// Import components
import Navbar from './components/Navbar/Navbar';
import Preloader from './components/Preloader';

// Import styles
import './sassStyles/app.scss';
import './fontello/css/fontello.css';

function App() {
  return (
    <Routes>
      <div id="theme" className="theme-dark bg-theme text-theme">
        {/* Navbar */}
        <Navbar />

        {/* Preloader */}
        {/* <Preloader /> */}

        <Switch>
          {/* Home */}
          <Route exact path="/" component={Home} />

          {/* About */}
          <Route exact path="/about" component={About} />

          {/* Login */}
          <Route exact path="/login" component={Login} />

          {/* AdminRoute */}
          <Route path='/admin' component={AdminRoute} />

          {/* Error */}
          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Routes>
  );
}

export default App;
