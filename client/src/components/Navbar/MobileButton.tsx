import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  label: string;
};

export default function MobileButton({ link, label }: Props) {
  return (
    <li className="px-3">
      <Link
        to={link}
        className="btn btn-sm w-100 px-0 pt-4 pb-3 text-start text-with-underline">
        <span className="px-3 h6 m-0 pe-auto">{label}</span>
        <div></div>
      </Link>
    </li>
  );
}
