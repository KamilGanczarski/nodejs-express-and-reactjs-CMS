import React from 'react'

export default function Button({ btn }) {
  return (
    <li className="d-flex px-3">
      <a href={btn.link}
        className="btn btn-sm w-100 px-0 pt-2 pb-1 text-start text-with-underline btn-navbar">
        <span>{btn.label}</span>
        <div></div>
      </a>
    </li>
  )
}
