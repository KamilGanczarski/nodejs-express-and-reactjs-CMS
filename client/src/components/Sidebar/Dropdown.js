import React from 'react'
import { Link } from 'react-router-dom'

export default function Dropdown({ btn }) {
  return (
    <div className="w-100 row m-0">
      <button
        className="btn btn-sm w-100 ps-4 pe-0 d-flex align-items-center btn-sidebar text-hover-light collapsed right-rotate"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse-area-${btn.label}`}
        aria-expanded="false"
        aria-controls={`collapse-area-${btn.label}`}>
        <i className="icon-th-2 pe-2"></i>
        <span className="d-inline text-uppercase fw-bold">
          {btn.label}
        </span>
        <i className="icon-right-open text-h5 m-0 collapse-nav-icon-right ms-auto me-3"></i>
      </button>
      <div className="collapse w-100" id={`collapse-area-${btn.label}`}>
        {btn.subButtons.map((subButton, index) => {
          return (
            <Link
              key={subButton.id}
              to={subButton.link}
              className="btn btn-sm w-100 ps-5 pe-2 text-start btn-sidebar text-hover-light">
              <span className="d-inline text-uppercase fw-bold">
                {subButton.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
