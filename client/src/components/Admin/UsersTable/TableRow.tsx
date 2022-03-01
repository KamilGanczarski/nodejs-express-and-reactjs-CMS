import React, { useEffect, useState } from 'react';

// Utils
import { UserFrontendModel } from '../../../utils/interfaces';

type Props = {
  RowUser: UserFrontendModel;
  userType: string;
};

export default function TableRow({ RowUser, userType }: Props) {
  const [User, setUser] = useState<UserFrontendModel>();

  /**
   * Relocate to preview
   * @param {Event} e Event from sender
   * @param {Number} id User's id
   */
   const customerPreview = (id: string) => {
    if (User && User.roles[0].value === 'portfolio history wedding') {
      window.location.href = `/portfolio/history-wedding/${id}`;
    } else {
      window.location.href = `/admin/gallery-preview/${id}`;
    }
  }

  /**
   * Relocate to edit user page
   * @param {Number} id User's id
   */
  const customerEditLink = (id: string) => {
    if (userType === "cooperator") {
      window.location.href = `/admin/edit-user/${id}`;
    } else {
      window.location.href = `/admin/gallery/${id}`;
    }
  }

  /**
   * Prevent change background parent node if onmouseover
   * @param {Event} e Event from sender
   */
  const hoverRow = (e: React.MouseEvent<HTMLElement>): void => {
    const element = e.currentTarget;
    const parentNode = element.parentNode as HTMLElement;
    parentNode.classList.add("hovered");
    element.addEventListener("mouseleave", () => {
      parentNode.classList.remove("hovered");
    });
  }

  useEffect(() => {
    setUser(RowUser)
  }, [RowUser]);

  // If User is not set
  if (!User) {
    return (
      <tr className="border-top table-row"></tr>
    );
  }

  return (
    <tr className="border-top table-row">
      {/* Id */}
      <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
        {User.id}
      </td>

      {/* Photo and login */}
      <td className="btn-sm w-300-px" onClick={()=>customerEditLink(User.id)}>
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
      <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
        {User.event}
      </td>

      {/* Event date */}
      {['customer', 'portfolio history wedding'].includes(userType) &&
        <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
          {User.dateShow.date !== '' ?
            <span>
              {User.dateShow.date}<br />({User.dateShow.passed})
            </span>
            :
            <i className="icon-calendar-plus-o text-custom"></i>
          }
        </td>
      }

      {/* Expiry date */}
      <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
        {User.dateShow.expiryDate !== '' ?
          <span>
            {User.dateShow.expiryDate}
            <br />
            ({User.dateShow.passedEnd})
          </span>
          :
          <i className="icon-calendar-plus-o text-custom"></i>
        }
      </td>

      {/* Preview button */}
      {['customer', 'portfolio history wedding'].includes(userType) &&
        <td
          className="btn-sm transition-effect text-hover-theme td-no-hover"
          onClick={()=>customerPreview(User.id)}
          onMouseOver={(e)=>hoverRow(e)}>
          Preview
        </td>
      }

      {/* Expand button */}
      <td
        className="btn-sm transition-effect td-no-hover bottom-rotate collapsed"
        data-bs-toggle="collapse"
        data-bs-target={`#table-collape-${User.id}`}
        aria-expanded="false"
        aria-controls={`table-collape-${User.id}`}
        onMouseOver={(e)=>hoverRow(e)}>
        <button className="btn text-hover-theme collapse-icon-rotate">
          <i className="icon-down-open text-custom"></i>
        </button>
      </td>
    </tr>
  );
}
