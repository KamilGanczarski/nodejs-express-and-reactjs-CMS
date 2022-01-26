import React, { useEffect, useState } from 'react'

export default function TableRow({ RowUser, userType }) {
  const [User, setUser] = useState({})

  /**
   * Relocate to preview
   * @param {Event} e Event from sender
   * @param {Number} id User's id
   */
  const clientPreview = (e, id) => {
    e.stopPropagation();
    if (User.permission.value === 'portfolio history wedding') {
      window.location.href = `/portfolio/history-wedding/${id}`;
    } else {
      window.location.href = `/admin/gallery-preview/${id}`;
    }
  }

  /**
   * Relocate to edit user page
   * @param {Number} id User's id
   */
  const clientEditLink = (id) => {
    if (userType == "cooperator") {
      window.location.href = `/admin/user-edit/${id}`;
    } else {
      window.location.href = `/admin/gallery/${id}`;
    }
  }

  /**
   * Prevent change background parent node if onmouseover
   * @param {Event} e Event from sender
   */
  const hoverRow = (e) => {
    const element = e.target; 
    element.parentNode.classList.add("hovered");
    element.addEventListener("mouseleave", () => {
      element.parentNode.classList.remove("hovered");
    });
  }

  useEffect(() => {
    setUser(RowUser)
  }, [RowUser])

  // If User is not set
  if (Object.keys(User).length === 0) {
    return <tr className="border-top table-row"></tr>;
  }

  return (
    <tr className="border-top table-row" onClick={()=>clientEditLink(User._id)}>
      {/* Id */}
      <td className="btn-sm">{User.webId + 1}</td>

      {/* Photo and login */}
      <td className="btn-sm w-300-px">
        {User.files.length > 0 ?
          <div className="w-100 bg-black img-16-9-container active">
            <img
              src={`uploads/${User.dir}/md_res_files/${User.files[0].path}`}
              alt={User.event}
              className="img-16-9 img-zoom-in" />
            <div className="text-center text-middle-absolute">
              <h6 className="w-100 px-3 m-0 text-light text-middle">
                {User.login}
              </h6>
            </div>
          </div>
          :
          <span>{User.login}</span>
        }
      </td>

      {/* Event name */}
      <td className="btn-sm">{User.event}</td>

      {/* Event date */}
      {['client', 'portfolio history wedding'].includes(userType) &&
        <td className="btn-sm">
            {User.date.date != null ?
              <span>
                {User.date.dateShow}<br />({User.date.passed})
              </span>
              :
              <i className="icon-calendar-plus-o text-custom"></i>
            }
        </td>
      }

      {/* Expiry date */}
      <td className="btn-sm">
        {User.date.expiryDate != null ?
          <span>
            {User.date.expiryDateShow}
            <br />
            ({User.date.passedEnd})
          </span>
          :
          <i className="icon-calendar-plus-o text-custom"></i>
        }
      </td>

      {/* Expand button */}
      <td
        className="btn-sm transition-effect td-no-hover bottom-rotate collapsed"
        data-bs-toggle="collapse"
        data-bs-target={`#table-collape-${User.webId}`}
        aria-expanded="false"
        aria-controls={`table-collape-${User.webId}`}
        onMouseOver={(e)=>hoverRow(e)}>
          <button className="btn text-hover-theme collapse-icon-rotate">
            <i className="icon-down-open text-custom"></i>
          </button>
      </td>

      {/* Preview button */}
      {['client', 'portfolio history wedding'].includes(userType) &&
        <td 
          className="btn-sm transition-effect text-hover-theme td-no-hover"
          onClick={(e)=>clientPreview(e, User._id)}
          onMouseOver={(e)=>hoverRow(e)}
          >
          Preview
        </td>
      }
    </tr>
  )
}
