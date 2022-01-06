import React, { useState, useEffect } from 'react'

import './Sidebar.scss';
import Button from './Button';
import Dropdown from './Dropdown';

import links from './links';

export default function Sidebar() {
  const [topButtons, setTopButtons] = useState([]);
  const [middleButtons, setMiddleButtons] = useState([]);
  const [bottomButtons, setBottomButtons] = useState([]);

  const fetchData = async () => {
    // Top buttons
    const newTopButtons = links.filter(link => link.position === 'top');
    setTopButtons(newTopButtons);

    // Middle buttons
    const newMiddleButtons = links.filter(link => link.position === 'middle');
    setMiddleButtons(newMiddleButtons);

    // Bottom buttons
    const newBottomButtons = links.filter(link => link.position === 'bottom');
    setBottomButtons(newBottomButtons);
  }

  const sidebar_event_listener = () => {
    // Hide sidebar if window has mobile size
    if (window.innerWidth < 1400)
      document.querySelectorAll(".Sidebar")[0].classList.toggle("toggled");

    // Event listener to hide sidebar
    document.querySelectorAll(".btn-hide-sidebar").forEach(element => {
      element.addEventListener("click", (e) => {
        document.querySelectorAll(".Sidebar")[0].classList.toggle("toggled");
      });
    });
  }

  useEffect(() => {
    fetchData()
    sidebar_event_listener()
  }, [])

  return (
    <nav className="fixed-top row sidebar-left">
      {/* Show sidebar */}
      <a className="circle-menu-btn btn-hide-sidebar fixed" data-bs-toggle="tooltip"
        data-bs-placement="right" title="Sidebar">
        <i className="icon-menu"></i>
      </a>

      {/* sidebar header */}
      <div className="w-100 px-0">
        <div className="div-under-navbar"></div>
        {/* Management */}
        <div className="w-100 py-4 mx-0 my-1 row justify-content-between">
          <a href="admin/home"
            className="btn w-auto px-4 py-2 mx-auto bg-transparent animated-box in">
            <span className="text-light">Management</span>
          </a>
        </div>
        {/* Management */}
        <div className="w-100 row m-0">
          <a href="admin/home" className="btn btn-sm col m-0 btn-sidebar text-hover-light">
            <i className="icon-th pe-2"></i>
            <span>Management</span>
          </a>
          {/* Hide sidebar */}
          <div className="d-flex align-items-center w-auto px-0">
            <button className="btn btn-sm px-3 py-1 btn-hide-sidebar close">
              <i className="icon-menu h4 m-0 text-hover-light"></i>
            </button>
          </div>
        </div>

        {topButtons.map((btn) => {
          if (btn.type === 'dropdown') {
            return <Dropdown key={btn.id} btn={btn} />;
          }
          return <Button key={btn.id} btn={btn} />;
        })}

        <div className="col-10 pt-3 mx-auto border-bottom"></div>
      </div>

      {/* Sidebar content */}
      <div className="container-fluid px-0 py-3">
        {middleButtons.map((btn) => {
          if (btn.type === 'dropdown') {
            return <Dropdown key={btn.id} btn={btn} />;
          }
          return <Button key={btn.id} btn={btn} />;
        })}
        {/* <div className="col-10 pt-3 mx-auto border-bottom"></div> */}
      </div>

      {/* Sidebar footer */}
      <div className="w-100 py-3 px-0 mb-0 text-light align-self-end">
        {bottomButtons.map((btn) => {
          if (btn.type === 'dropdown') {
            return <Dropdown key={btn.id} btn={btn} />;
          }
          return <Button key={btn.id} btn={btn} />;
        })}
      </div>
    </nav>
  )
}
