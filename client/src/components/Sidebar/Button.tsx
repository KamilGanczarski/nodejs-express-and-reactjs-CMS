import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  icon: string;
  label: string;
};

export default function Button({ link, icon, label }: Props) {
  return (
    <div className="w-100 row m-0">
      <Link
        to={link}
        className="btn btn-sm w-100 btn-sidebar text-hover-light">
        <i className={`${icon} pe-2`}></i>
        <span>{label}</span>
      </Link>
    </div>
  );
}
