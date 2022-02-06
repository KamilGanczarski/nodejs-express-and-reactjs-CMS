import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  label: string;
};

export default function Button({ link, label }: Props) {
  return (
    <li className="d-flex px-3">
      <Link
        to={link}
        className="btn btn-sm w-100 px-0 pt-2 pb-1 text-start text-with-underline btn-navbar">
        <span>{label}</span>
        <div></div>
      </Link>
    </li>
  );
}
