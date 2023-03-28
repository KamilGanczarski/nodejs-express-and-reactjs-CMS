import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Components
import Button from './Button';
import MobileButton from './MobileButton';
import Dropdown from './Dropdown';
import MobileDropdown from './MobileDropdown';

import { scrollToEvent } from './ScrollTo';

// Styles
import './Navbar.scss'

// Data and settings
import { links, LinkType, settings } from './data';

type Props = {};

export default function Navbar({}: Props) {
  let location = useLocation();
  const [buttons, setButtons] = useState<LinkType[]>([]);

  let color0: string = 'transparent'; // First color
  let color1: string = '#0d0d0d'; // Second color
  let position0: boolean = true; // Change color to first if navbar position is 0
  let otherPosition: boolean = true; // Change color when navabr position is below 0
  let dynamic: boolean = true; // Dynamic navbat or static
  let nativeDynamic: boolean = true; // The same value as dynamic
  let currentScrollPosition: number = 0; // Number to current position
  let prevScrollPosition: number = 0; // Number to previous position
  let scrollToTop: HTMLButtonElement; // Scroll to top button

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
  const changeNavBackground = (background: string) => {
    if (background !== 'transparent') {
      background = '#000000';
    }
    // Set variable color
    let navbarFixedDOM = document.querySelector(
      '.Navbar-fixed'
    ) as HTMLDivElement;
    navbarFixedDOM.style.setProperty('--navbar-shadow', background);
  }

  const adjustNavbarColor = () => {
    // Change color when navabr position is 0
    if (currentScrollPosition === 0 && position0) {
      let navbarContentDOM = document.querySelector(
        '#main-navbar-content'
      ) as HTMLDivElement;
      if (!navbarContentDOM.classList.contains('show')) {
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
    let navbarFixedDOM = document.querySelector(
      '.Navbar-fixed'
    ) as HTMLDivElement;
    // If scroll up
    if (prevScrollPosition > currentScrollPosition) {
      if (dynamic) {
        navbarFixedDOM.classList.remove('up');
      }
    // If scroll down
    } else {
      if (dynamic) {
        navbarFixedDOM.classList.add('up');
      }
    }
  }

  /**
   * Scroll event handler to set scrollToTopBns visibility
   */
  const scrollToTopBtn = () => {
    // Check if already set
    if (!scrollToTop) {
      scrollToTop = document.querySelectorAll(
        '.scroll-to-top'
      )[0] as HTMLButtonElement;
    }

    // Show button
    if (currentScrollPosition > 1200) {
      scrollToTop.classList.add('show');
    // Hide button
    } else {
      scrollToTop.classList.remove('show');
    }
  }

  const setSettings = (
    _position0: boolean,
    _otherPosition: boolean,
    _dynamic: boolean
  ) => {
    position0 = _position0;
    otherPosition = _otherPosition;
    dynamic = _dynamic;
    nativeDynamic = _dynamic;
  }

  const includesWithStartWith = (arr: string[], url: string): boolean => {
    const find = arr.find(element => url.startsWith(element));
    return find ? true : false;
  }

  const setNavbarSettings = () => {
    const url = window.location.pathname;

    // Static navbar and no transparent
    if (includesWithStartWith(settings.noDynamicAndNoTransparent, url)) {
      setSettings(false, true, false);
      adjustNavbarColor();
      return;
    }

    // Static navbar
    if (includesWithStartWith(settings.noDynamic, url)) {
      setSettings(true, false, false);
      adjustNavbarColor();
      return;
    }

    // No transparent
    if (includesWithStartWith(settings.noTransparent, url)) {
      setSettings(false, true, true);
      adjustNavbarColor();
      return;
    }

    // Default
    setSettings(true, true, true);
    adjustNavbarColor();
    return;
  }

  // Set new navbar setting
  function usePageViews() {
    React.useEffect(() => {
      setNavbarSettings();
    }, [location]);
  }
  usePageViews();

  useEffect(() => {
    setButtons(links);
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
              return <Dropdown
                key={btn.id}
                label={btn.label}
                subButtons={btn.subButtons} />;
            }
            return <Button
              key={btn.id}
              link={btn.link}
              label={btn.label} />;
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
              return <MobileDropdown
                key={btn.id}
                label={btn.label}
                subButtons={btn.subButtons} />;
            }
            return <MobileButton
              key={btn.id}
              link={btn.link}
              label={btn.label} />;
          })}
        </ul>
      </div>

      {/* Scroll top button */}
      <button
        onClick={()=>scrollToEvent('.bg-theme')}
        className="btn btn-sm p-0 scroll-to-top hide">
        <i className="icon-up-open h2 m-0 text-black text-shadow-dark"></i>
      </button>
    </nav>
  );
}
