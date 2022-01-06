import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ btn }) {
  return (
    <div className="w-100 row m-0">
      <Link to={btn.link}
        className="btn btn-sm w-100 btn-sidebar text-hover-light">
        <i className={`${btn.icon} pe-2`}></i>
        <span>{btn.label}</span>
      </Link>
    </div>
  )
}
