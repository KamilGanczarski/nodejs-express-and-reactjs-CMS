import React, { useState, useEffect } from 'react'
import {
  Link,
  BrowserRouter as Router,
  Switch,
  useLocation
} from 'react-router-dom'

// Components
import Button from './Button'
import MobileButton from './MobileButton'
import Dropdown from './Dropdown'
import MobileDropdown from './MobileDropdown'

import { scrollTo } from './ScrollTo'

// Styles
import './Navbar.scss'

import { links, settings } from './data';

export default function Navbar() {
  const [buttons, setButtons] = useState([]);

  let color0 = 'transparent'; // First color in string
  let color1 = '#0d0d0d'; // Second color in string
  let position0 = true; // Change color to first if navbar position is 0
  let otherPosition = true; // Change color when navabr position is below 0
  let dynamic = true; // Dynamic navbat or static
  let nativeDynamic = true; // The same value as dynamic
  let currentScrollPosition = 0; // Number to current position
  let prevScrollPosition = 0; // Number to previous position
  let scrollToTop = '';

  const fetchData = async () => {
    setButtons(links)
  }

  /**
   * Scroll event handler to set navbar, scrollToTopBns hide or show
   */
  const navbarEventListener = () => {
    currentScrollPosition = window.pageYOffset;
    adjustNavbarColor();
    adjustNavbarPosition();
    prevScrollPosition = currentScrollPosition;
    scrollToTopBtn();
  }

  /**
   * Change navbar background
   * @param {String} background Color in css format 
   */
  const changeNavBackground = (background) => {
    if (background !== 'transparent') {
      background = '#000000';
    }
    // Set variable color
    document.querySelector('.Navbar-fixed').style.setProperty(
      '--navbar-shadow',
      background
    );
  }

  const adjustNavbarColor = () => {
    // Change color when navabr position is 0
    if (currentScrollPosition === 0 && position0) {
        if (!document.querySelector('#main-navbar-content').classList.contains('show')) {
          changeNavBackground(color0);
        }
    } else{
        // Change color when navabr position is below 0
        if (otherPosition) {
          changeNavBackground(color1);
        }
    }
  }

  /**
   * Adjust navbar position fixed to top or out of user view
   */
  const adjustNavbarPosition = () => {
    // If scroll up
    if (prevScrollPosition > currentScrollPosition) {
      if (dynamic) {
        document.querySelector('.Navbar-fixed').classList.remove('up');
      }
    // If scroll down
    } else {
      if (dynamic) {
        document.querySelector('.Navbar-fixed').classList.add('up');
      }
    }
  }

  /**
   * Scroll event handler to set scrollToTopBns visibility
   */
  const scrollToTopBtn = () => {
    // Check if already set
    if (scrollToTop === '') {
      scrollToTop = document.querySelectorAll('.scroll-to-top')[0];
    }

    // Show button
    if (currentScrollPosition > 1200) {
      scrollToTop.classList.add('show');
    // Hide button
    } else {
      scrollToTop.classList.remove('show');
    }
  }

  const setSettings = (_position0, _otherPosition, _dynamic) => {
    position0 = _position0;
    otherPosition = _otherPosition;
    dynamic = _dynamic;
    nativeDynamic = _dynamic;
  }

  const setNavbarSettings = () => {
    const url = window.location.pathname;
    // Static navbar and no transparent
    if (settings.noDynamicAndNoTransparent.includes(url)) {
      setSettings(false, true, false);
      adjustNavbarColor(color1);
      return;
    }

    // Static navbar
    if (settings.noDynamic.includes(url)) {
      setSettings(true, false, false);
      adjustNavbarColor(color1);
      return;
    }

    // No transparent
    if (settings.noTransparent.includes(url)) {
      setSettings(false, true, true);
      adjustNavbarColor(color1);
      return;
    }

    // Default
    setSettings(true, true, true);
    adjustNavbarColor(color1);
    return;
  }

  // Set new navbar setting
  function usePageViews() {
    let location = useLocation();
    React.useEffect(() => {
      setNavbarSettings();
    }, [location]);
  }
  usePageViews();

  useEffect(() => {
    fetchData()
    setNavbarSettings();

    window.onscroll = () => {
      navbarEventListener()
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg py-0 Navbar-fixed">
      {/* Logo */}
      <div className="pull-left ps-4 pt-4 mt-1 pb-0 d-lg-none">
        <Link to="/" title="Home" className="btn p-0">
          <img
            src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
            alt="Pspoto logo white"
            width="80"
            height="80"
            className="p-2 logo-img" />
        </Link>
      </div>

      {/* Navbar button */}
      <button
        type="button"
        className="btn-menu navbar-toggler me-3 btn navbar-btn collapsed border-0"
        data-bs-toggle="collapse"
        data-bs-target="#main-navbar-content"
        aria-controls="main-navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div id="main-navbar-content" className="collapse navbar-collapse">
        {/* Desktop version col */}
        <ul className="d-none d-lg-flex navbar-nav px-4">
          {/* Logo */}
          <div className="pull-left px-3 pt-3 pb-0">
            <Link to="/" title="Home" className="btn p-0">
              <img
                src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
                alt="Pspoto logo white"
                width="80"
                height="80"
                className="logo-img" />
            </Link>
          </div>
        </ul>

        {/* Desktop version */}
        <ul className="d-none d-lg-flex flex-wrap col justify-content-end navbar-nav px-4">
          {buttons.map((btn) => {
            if (btn.type === 'dropdown') {
              return <Dropdown key={btn.id} btn={btn} />;
            }
            return <Button key={btn.id} btn={btn} />;
          })}
        </ul>

        {/* Mobile version */}
        <ul className="navbar-nav px-4 d-flex d-lg-none">
          {/* Logo */}
          <div className="pull-left py-4 mt-1">
            <Link to="/" title="Home" className="btn p-0">
              <img
                src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
                alt="Pspoto logo white"
                width="80"
                height="80"
                className="p-2 logo-img" />
            </Link>
          </div>

          {buttons.map((btn, index) => {
            if (btn.type === 'dropdown') {
              return <MobileDropdown key={btn.id} btn={btn} />;
            }
            return <MobileButton key={btn.id} btn={btn} />;
          })}
        </ul>
      </div>

      {/* Scroll top button */}
      <button
        onClick={()=>scrollTo('.bg-theme')}
        className="btn btn-sm p-0 scroll-to-top hide">
        <i className="icon-up-open h2 m-0 text-black text-shadow-dark"></i>
      </button>
    </nav>
  )
}
