import React from 'react'

export default function Hyperlink({ btn }) {
  return (
    <div className="w-100 row m-0">
      <a
        href={btn.link}
        className="btn btn-sm w-100 btn-sidebar text-hover-light">
        <i className={`${btn.icon} pe-2`}></i>
        <span>{btn.label}</span>
      </a>
    </div>
  )
}
