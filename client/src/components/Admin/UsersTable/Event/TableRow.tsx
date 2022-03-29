import React, { useEffect, useState } from 'react';

// Utils
import { UserFrontendModel } from '../../../../utils/interfaces';

type Props = {
  RowUser: UserFrontendModel;
  userType: string;
};

export default function TableRowEvent({ RowUser, userType }: Props) {
  const [ User, setUser ] = useState<UserFrontendModel>();

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

      {/* Event date */}
      <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
        {User.dateShow.date !== '' ?
          <span>
            {User.dateShow.date}<br />({User.dateShow.passed})
          </span>
          :
          <i className="icon-calendar-plus-o text-custom"></i>
        }
      </td>

      {/* Event name */}
      <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
        {User.event}
      </td>
  
      {/* Contract */}
      <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
        {User.contract[0].contract ?
          <i className="icon-check text-custom"></i>
          :
          <i className="icon-cancel text-danger"></i>
        }
      </td>

      {/* Pdf */}
      <td className="btn-sm" onClick={()=>customerEditLink(User.id)}>
        {/* {User.contract[0].pdf !== '' ?
          <a
            href={`uploads/${User.dir}/pkg_files/${User.contract[0].pdf}`}
            target="_blank"
            className="btn p-0">
            <i className="icon-doc-text-inv text-custom"></i>
          </a>
          :
          <i className="icon-doc-text-inv text-danger"></i>
        } */}
      </td>

      {/* Price */}
      <td className="btn-sm">{User.contract[0].price}</td>

      {/* Down payment */}
      <td className="btn-sm">{User.contract[0].advance}</td>

      {/* How much paid */}
      <td className="btn-sm">{User.contract[0].howmuchpaid}</td>

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
  )
}