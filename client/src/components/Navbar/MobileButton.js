import React from 'react'

export default function MobileButton({ btn }) {
  return (
    <li className="px-3">
      <a href={btn.link}
        className="btn btn-sm w-100 px-0 pt-4 pb-3 text-start text-with-underline">
        <span className="px-3 h6 m-0 pe-auto">{btn.label}</span>
        <div></div>
      </a>
  </li>
  )
}
