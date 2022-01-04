import React from 'react'
import { Link } from 'react-router-dom'

export default function Dropdown({ btn }) {
  return (
    <li className="px-0">
      <div className="dropdown dropdown-nav">
        <button className="btn btn-sm w-100 px-3 pt-2 pb-1 text-start text-with-underline text-light-important btn-navbar"
          id="dropdown-menu-0" data-bs-toggle="dropdown"
          aria-expanded="false">
          <span>{btn.label}</span>
          <div></div>
        </button>
        <div className="dropdown-menu bg-black border-0 pt-3"
          aria-labelledby="dropdown-menu-0">
          {btn.subButtons.map((subButtons, index) => {
            return (
              <Link key={subButtons.id} to={subButtons.link}
                className="btn btn-sm w-100 px-3 py-2 text-start text-with-underline">
                <span>{subButtons.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </li>
  )
}
