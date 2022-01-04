import React from 'react'
import { Link } from 'react-router-dom'

export default function MobileButton({ btn }) {
  return (
    <li className="px-3">
      <Link to={btn.link}
        className="btn btn-sm w-100 px-0 pt-4 pb-3 text-start text-with-underline">
        <span className="px-3 h6 m-0 pe-auto">{btn.label}</span>
        <div></div>
      </Link>
  </li>
  )
}
