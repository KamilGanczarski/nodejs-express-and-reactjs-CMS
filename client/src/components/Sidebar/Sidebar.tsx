import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Utils
import { LinkModel } from '../../interfaces/interfaces';

// Components
import './Sidebar.scss';
import Button from './Button';
import Dropdown from './Dropdown';
import Hyperlink from './Hyperlink';
import OnclickButton from './OnclickButton';

type Props = {
  links: LinkModel[]
};

export default function Sidebar({ links }: Props) {
  const [topButtons, setTopButtons] = useState<LinkModel[]>([]);
  const [middleButtons, setMiddleButtons] = useState<LinkModel[]>([]);
  const [bottomButtons, setBottomButtons] = useState<LinkModel[]>([]);

  const fetchData = async () => {
    // Top buttons
    setTopButtons(links.filter(link => link.position === 'top'));
    // Middle buttons
    setMiddleButtons(links.filter(link => link.position === 'middle'));
    // Bottom buttons
    setBottomButtons(links.filter(link => link.position === 'bottom'));
  }

  const sidebarEventListener = () => {
    // Hide sidebar if window has mobile size
    if (window.innerWidth < 1400)
      document.querySelectorAll(".Sidebar")[0].classList.toggle("toggled");

    // Event listener to hide sidebar
    document.querySelectorAll(".btn-toggle-sidebar").forEach(element => {
      element.addEventListener("click", (e) => {
        document.querySelectorAll(".Sidebar")[0].classList.toggle("toggled");
      });
    });
  }

  useEffect(() => {
    fetchData()
    sidebarEventListener()
  }, []);

  return (
    <nav className="fixed-top row sidebar-left">
      {/* Show sidebar */}
      <a
        className="circle-menu-btn btn-toggle-sidebar fixed"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="Sidebar">
        <i className="icon-menu"></i>
      </a>

      {/* sidebar header */}
      <div className="w-100 px-0">
        <div className="div-under-navbar"></div>
        {/* Management */}
        <div className="w-100 py-4 my-1">
          <div className="w-100 m-0 text-center">
            <Link
              to="/admin/home"
              className="btn btn-sm text-custom btn-rounded border-custom btn-shine btn-shine-hover">
              <span className="small text-uppercase font-weight-bold">
                Management
              </span>
            </Link>
          </div>
        </div>

        {/* Management */}
        <div className="w-100 row m-0">
          <Link
            to="/admin/home"
            className="btn btn-sm col m-0 btn-sidebar text-hover-light">
            <i className="icon-th pe-2"></i>
            <span>Management</span>
          </Link>

          {/* Hide sidebar */}
          <div className="d-flex align-items-center w-auto px-0">
            <button className="btn btn-sm px-3 py-1 btn-toggle-sidebar close">
              <i className="icon-left-open h5 m-0 text-hover-light"></i>
            </button>
          </div>
        </div>

        {topButtons.map((btn) => {
          if (btn.type === 'dropdown') {
            return <Dropdown
              key={btn.id}
              label={btn.label}
              icon={btn.icon}
              subButtons={btn.subButtons} />
          } else if (btn.type === 'hyperlink') {
            return <Hyperlink
              key={btn.id}
              link={btn.link}
              icon={btn.icon}
              label={btn.label} />
          } else if (btn.type === 'onclick') {
            return <OnclickButton
              key={btn.id}
              onclick={btn.onclick}
              icon={btn.icon}
              label={btn.label} />
          }
          return <Button
            key={btn.id}
            link={btn.link}
            icon={btn.icon}
            label={btn.label} />
        })}

        <div className="col-10 pt-3 mx-auto border-bottom"></div>
      </div>

      {/* Sidebar content */}
      <div className="container-fluid px-0 py-3">
        {middleButtons.map((btn) => {
          if (btn.type === 'dropdown') {
            return <Dropdown
              key={btn.id}
              label={btn.label}
              icon={btn.icon}
              subButtons={btn.subButtons} />
          } else if (btn.type === 'hyperlink') {
            return <Hyperlink
              key={btn.id}
              link={btn.link}
              icon={btn.icon}
              label={btn.label} />
          } else if (btn.type === 'onclick') {
            return <OnclickButton
              key={btn.id}
              onclick={btn.onclick}
              icon={btn.icon}
              label={btn.label} />
          }
          return <Button
            key={btn.id}
            link={btn.link}
            icon={btn.icon}
            label={btn.label} />
        })}

        {middleButtons.length > 0 &&
          <div className="col-10 pt-3 mx-auto border-bottom"></div>
        }
      </div>

      {/* Sidebar footer */}
      <div className="w-100 py-3 px-0 mb-0 text-light align-self-end">
        {bottomButtons.map((btn) => {
          if (btn.type === 'dropdown') {
            return <Dropdown
              key={btn.id}
              label={btn.label}
              icon={btn.icon}
              subButtons={btn.subButtons} />
          } else if (btn.type === 'hyperlink') {
            return <Hyperlink
              key={btn.id}
              link={btn.link}
              icon={btn.icon}
              label={btn.label} />
          } else if (btn.type === 'onclick') {
            return <OnclickButton
              key={btn.id}
              onclick={btn.onclick}
              icon={btn.icon}
              label={btn.label} />
          }
          return <Button
            key={btn.id}
            link={btn.link}
            icon={btn.icon}
            label={btn.label} />
        })}
      </div>
    </nav>
  );
}
