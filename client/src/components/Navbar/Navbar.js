import React, { useState, useEffect } from 'react'

// Components
import Button from './Button'
import MobileButton from './MobileButton'
import Dropdown from './Dropdown'
import MobileDropdown from './MobileDropdown'

// Styles
import './Navbar.scss'

const url = 'json/navLinks.json'

export default function Navbar() {
  const [buttons, setButtons] = useState([])

  const fetchData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setButtons(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black py-0">
      {/* Logo */}
      <div className="pull-left ps-4 pt-4 mt-1 pb-0 d-lg-none">
        <a href="/" title="Home" className="btn p-0">
          <img src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
            alt="Pspoto logo white" width="80" height="80"
            className="p-2 logo-img" />
        </a>
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
            <a href="/" title="Home" className="btn p-0">
              <img src="/images/psphoto/logo/min/PSPHOTO_LOGO_biale-min.png"
                alt="Pspoto logo white" width="80" height="80"
                className="logo-img" />
            </a>
          </div>
        </ul>

{/* Desktop version */}
        <ul className="d-none d-lg-flex flex-wrap col justify-content-end navbar-nav px-4">
          {buttons.map((btn, index) => {
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
