import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Components
import Button from './Button'
import MobileButton from './MobileButton'
import Dropdown from './Dropdown'
import MobileDropdown from './MobileDropdown'

// Styles
import './Navbar.scss'

import links from './links';

export default function Navbar() {
  const [buttons, setButtons] = useState([])
  let color0 = 'transparent'; // First color in string
  let color1 = '#0d0d0d'; // Second color in string
  let position_0 = true; // Change color to first if navbar position is 0
  let other_position = true; // Change color when navabr position is below 0
  let dynamic = true; // Dynamic navbat or static
  let native_dynamic = true; // The same value as dynamic
  let current_scroll_pos = 0; // Number to current position
  let prev_scroll_pos = 0; // Number to previous position
  let scroll_to_top = '';
  const settings = {
    noDynamic: [ '/admin/home' ],
    noTransparent: [],
    noDynamicAndnoTransparent: []
  }

  const fetchData = async () => {
    setButtons(links)
  }

  const navbar_event_listener = () => {
    current_scroll_pos = window.pageYOffset;
    adjust_navbar_color();
    adjust_navbar_position();
    prev_scroll_pos = current_scroll_pos;
    // scroll_to_top_btn();
  }

  const change_nav_background = (color) => {
    document.querySelector('.Navbar-fixed').style.background = color;
    if (color !== 'transparent') {
      color = '#000000';
    }
    document.querySelector('.Navbar-fixed').style.setProperty('--navbar-shadow', color);
  }

  const adjust_navbar_color = () => {
    // Change color when navabr position is 0
    if (current_scroll_pos === 0 && position_0) {
        if (!document.querySelector('#main-navbar-content').classList.contains('show')) {
          change_nav_background(color0);
        }
    } else{
        // Change color when navabr position is below 0
        if (other_position) {
          change_nav_background(color1);
        }
    }
  }

  const adjust_navbar_position = () => {
    // If scroll up
    if (prev_scroll_pos > current_scroll_pos) {
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

  const scroll_to_top_btn = () => {
    if (scroll_to_top === '') {
      scroll_to_top = document.querySelectorAll('.scroll-to-top')[0];
    }

    if (current_scroll_pos > 1200) {
      scroll_to_top.classList.add('show');
    } else {
      scroll_to_top.classList.remove('show');
    }
  }

  const setSettings = (_position_0, _other_position, _dynamic) => {
    _position_0 = position_0;
    _other_position = other_position;
    _dynamic = dynamic;
  }

  const setNavbarSettings = () => {
    const url = window.location.pathname;

    // Static navbar and no transparent
    if (settings.noDynamicAndnoTransparent.includes(url)) {
      setSettings(false, true, false);
      return;
    }

    // Static navbar
    if (settings.noDynamic.includes(url)) {
      setSettings(true, false, false);
      return;
    }

    // No transparent
    if (settings.noTransparent.includes(url)) {
      setSettings(false, true, true);
      return;
    }

    // Default
    setSettings(true, true, true);
    return;
  }

  useEffect(() => {
    fetchData()
    setNavbarSettings();
    
    window.onscroll = () => {
      navbar_event_listener()
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg py-0 Navbar-fixed">
      {/* Logo */}
      <div className="pull-left ps-4 pt-4 mt-1 pb-0 d-lg-none">
        <Link to="/" title="Home" className="btn p-0">
          <img src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
            alt="Pspoto logo white" width="80" height="80"
            className="p-2 logo-img" />
        </Link>
      </div>

      {/* Navbar button */}
      <button type="button" className="btn-menu navbar-toggler me-3 btn navbar-btn collapsed border-0"
        data-bs-toggle="collapse" data-bs-target="#main-navbar-content"
        aria-controls="main-navbar-content" aria-expanded="false"
        aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="collapse navbar-collapse" id="main-navbar-content">
{/* Desktop version col */}
        <ul className="d-none d-lg-flex navbar-nav px-4">
          {/* Logo */}
          <div className="pull-left px-3 pt-3 pb-0">
            <Link to="/" title="Home" className="btn p-0">
              <img src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
                alt="Pspoto logo white" width="80" height="80"
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
            <a href="/" title="Home" className="btn p-0">
              <img src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
                alt="Pspoto logo white" width="80" height="80"
                className="p-2 logo-img" />
            </a>
          </div>

          {buttons.map((btn, index) => {
            if (btn.type === 'dropdown') {
              return <MobileDropdown key={btn.id} btn={btn} />;
            }
            return <MobileButton key={btn.id} btn={btn} />;
          })}
        </ul>
      </div>
    </nav>
  )
}
