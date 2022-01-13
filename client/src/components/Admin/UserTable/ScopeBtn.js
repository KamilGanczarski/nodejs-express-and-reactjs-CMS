import React from 'react'

export default function ScopeBtn(props) {
  const {
    tableRowsLimitBtn,
    tableRowsLimit,
    setTableRowsLimit
  } = props;

  return (
    <div className="dropdown w-auto">
      <button
        className="btn btn-sm w-auto fw-bold btn-slide-icon"
        id="dropdown-menu-5"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <span className="text-theme">Table scope: {tableRowsLimit}</span>
        <i className="icon-down-open-mini theme"></i>
      </button>
      <div
        className="dropdown-menu shadow border border-theme bg-theme"
        aria-labelledby="dropdown-menu-5">
        {tableRowsLimitBtn.map((btn, index) => {
          return (
            <button
              key={index}
              onClick={()=>setTableRowsLimit(btn.value)}
              className={`w-100 btn px-0 py-1 rounded-0 text-center text-hover-theme ${btn.active}`}>
              {btn.value}
            </button>
          )
        })}
      </div>
    </div>
  )
}
