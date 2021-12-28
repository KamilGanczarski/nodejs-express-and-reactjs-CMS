import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'

// Import components
import Navbar from './components/Navbar/Navbar'

// Import styles
import './sassStyles/index.scss'

function App() {
  return (
    <Router>
      <div id="theme" data-theme="dark">
        {/* Navbar */}
        <Navbar />

        <Switch>
          {/* Home */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* About */}
          <Route path="/about">
            <About />
          </Route>

          {/* Error */}
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
