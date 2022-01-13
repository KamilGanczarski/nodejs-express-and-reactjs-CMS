import React from 'react'

export default function SortBtn({ btn, sortUsers }) {
  return (
    <th className="py-1 border-0">
      <button
        onClick={()=>sortUsers(btn.value, 0)}
        className="btn btn-sm w-100 px-0 py-2 text-theme-1">
        {/* Title */}
        <span className="fw-bold me-2">{btn.name}</span>
        {/* Icon */}
        {btn.active === 'no' &&
          <i className="icon-down-open text-theme-1-disable"></i>
        }
        {btn.active === 'down' &&
          <i className="icon-down-open"></i>
        }
        {btn.active === 'up' && 
          <i className="icon-up-open"></i>
        }
      </button>
    </th>
  )
}
