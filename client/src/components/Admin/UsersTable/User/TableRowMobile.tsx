import React, { useEffect, useState } from 'react';

// Utils
import { UserFrontendModel } from '../../../../interfaces/interfaces';

type Props = {
  RowUser: UserFrontendModel;
  userType: string;
};

export default function TableRowMobile({ RowUser, userType }: Props) {
  const [User, setUser] = useState<UserFrontendModel>();

  /**
   * Relocate to preview
   * @param {Event} e Event from sender
   * @param {Number} id User's id
   */
   const customerPreview = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
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

  useEffect(() => {
    setUser(RowUser)
  }, [RowUser]);

  // If User is not set
  if (!User) {
    return <tr className="border-top table-row"></tr>;
  }

  return (
    <tr className="text-theme bg-theme-hover cursor-pointer">
      <td
        colSpan={2}
        className="text-start"
        onClick={()=>customerEditLink(User.id)}>
        {/* Id */}
        <p className="m-0">{User.id}</p>
        
        {/* Photo and event */}
        {['customer', 'portfolio history wedding'].includes(userType) && User.files.length > 0 ?
          // Photo
          <div className="w-100 bg-black img-16-9-container active">
            <img
              src={`uploads/${User.dir}/md_res_files/${User.files[0].path}`}
              alt={User.event}
              className="img-16-9 img-zoom-in" />
            <div className="text-center text-middle-absolute">
              <h5 className="w-100 px-3 m-0 text-light text-middle">
                {User.event}
              </h5>
            </div>
          </div>
          // Event
          : ['customer', 'portfolio history wedding'].includes(userType) ?
          <div className="w-100 m-0 mx-auto text-center fw-bold">
              <h5 className="pt-0 pb-4 m-0">{User.event}</h5>
              <p className="text-theme-1">No photo</p>
          </div>
          :
          null
        }

        {/* Login */}
        {['customer', 'cooperator'].includes(userType) &&
          <p className="pt-3 m-0 text-start">
            <span className="fw-bold">Login: </span>   
            <span className="text-theme-1">{User.login}</span>
          </p>
        }

        {/* Date */}
        {['customer', 'portfolio history wedding'].includes(userType) &&
          <p className="py-3 m-0 text-start">
            <span className="fw-bold">Event date: </span>
            {User.dateShow.date != null ?
              <span className="text-theme-1">
                {User.dateShow.date}
                ({User.dateShow.passed})
              </span>
              :
              <i className="icon-calendar-plus-o text-custom"></i>
            }
          </p>
        }

        {/* Expiry date */}
        <p className="text-start">
          <span className="fw-bold">Expiration date: </span>
          {User.dateShow.expiryDate != null ?
            <span className="text-theme-1">
              {User.dateShow.expiryDate}
              ({User.dateShow.passedEnd})
            </span>
            :
            <i className="icon-calendar-plus-o text-custom"></i>
          }
        </p>

        {/* Preview */}
        {['customer', 'portfolio history wedding'].includes(userType) &&
          <button
            className="btn btn-sm w-100 px-4 py-2 my-2 fw-bold text-hover-theme"
            onClick={(e)=>customerPreview(e, User.id)}>
            Preview
          </button>
        }
      </td>
    </tr>
  );
}
