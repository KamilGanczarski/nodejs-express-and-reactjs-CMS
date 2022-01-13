import React from 'react'
import { Link } from 'react-router-dom'

export default function MobileDropdown({ btn }) {
  return (
    <li className="px-3">
      <div className="dropdown dropdown-nav right-rotate">
        <button
          className="btn btn-sm w-100 px-0 pt-4 pb-3 text-start d-flex justify-content-between align-items-center text-with-underline text-light-important"
          id="dropdown-menu-0"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <span className="px-3 h6 m-0">{btn.label}</span>
          <i className="icon-right-open text-h4 m-0 dropdown-nav-icon-right"></i>
        </button>
        <div
          className="dropdown-menu bg-transparent border-0 py-0 m-0"
          aria-labelledby="dropdown-menu-0">
          {btn.subButtons.map((subButton) => {
            return (
              <Link key={subButton.id} to={subButton.link}
                className="btn btn-sm w-100 ps-5 pe-0 py-3 text-start text-with-underline">
                <span className="h6">{subButton.label}</span>
              </Link>
            )
          })}
          <div className="w-100 pb-3 d-flex align-items-center">
            <div className="col border-custom-left"></div>
            <div className="col border-custom-right"></div>
          </div>
        </div>
      </div>
    </li>
  )
}
