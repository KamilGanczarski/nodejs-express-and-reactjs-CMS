import React from 'react'

export default function SortBtn({ btn, sortUsers }) {
  return (
    <th className="py-1 border-0">
      <button
        onClick={()=>sortUsers(btn.value, btn.id)}
        className="btn btn-sm w-100 px-0 py-2 text-theme-1">
        {/* Title */}
        <span className="fw-bold me-2">{btn.name}</span>

        {/* Icon */}
        {{
          'no': <i className="icon-down-open text-theme-1-disable"></i>,
          'down': <i className="icon-down-open"></i>,
          'up': <i className="icon-up-open"></i>
        }[btn.active]}
      </button>
    </th>
  )
}
