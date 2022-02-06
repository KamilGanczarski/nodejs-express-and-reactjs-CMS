import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  icon: string;
  subButtons: {
    id: number;
    link: string;
    label: string;
  }[];
};

export default function Dropdown({ label, icon, subButtons }: Props) {
  return (
    <div className="w-100 row m-0">
      <button
        className="btn btn-sm w-100 ps-4 pe-0 d-flex align-items-center btn-sidebar text-hover-light collapsed right-rotate"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse-area-${label}`}
        aria-expanded="false"
        aria-controls={`collapse-area-${label}`}>
        <i className={`${icon} pe-2`}></i>
        <span className="d-inline text-uppercase fw-bold">{label}</span>
        <i className="icon-right-open text-h5 m-0 collapse-icon-rotate ms-auto me-3"></i>
      </button>
      <div
        className="w-100 collapse collapse-slide-sidebar"
        id={`collapse-area-${label}`}>
        {subButtons.map((subButton, index) => {
          return (
            <Link
              key={subButton.id}
              to={subButton.link}
              className="btn btn-sm w-100 ps-5 pe-2 text-start btn-sidebar text-hover-light">
              <span className="d-inline text-uppercase fw-bold">
                {subButton.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
