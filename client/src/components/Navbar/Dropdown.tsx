import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  subButtons: {
    id: number;
    link: string;
    label: string;
  }[];
};

export default function Dropdown({ label, subButtons }: Props) {
  return (
    <li className="px-0">
      <div className="dropdown dropdown-nav">
        <button
          className="btn btn-sm w-100 px-3 pt-2 pb-1 text-start text-with-underline text-light-important btn-navbar"
          id="dropdown-menu-0"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <span>{label}</span>
          <div></div>
        </button>
        <div
          className="dropdown-menu bg-black border-0 pt-3"
          aria-labelledby="dropdown-menu-0">
          {subButtons.map((subButton) => {
            return (
              <Link key={subButton.id} to={subButton.link}
                className="btn btn-sm w-100 px-3 py-2 text-start text-with-underline">
                <span>{subButton.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </li>
  );
}
