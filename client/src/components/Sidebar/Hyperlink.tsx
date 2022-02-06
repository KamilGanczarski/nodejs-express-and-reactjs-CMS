import React from 'react';

type Props = {
  link: string;
  icon: string;
  label: string;
};

export default function Hyperlink({ link, icon, label }: Props) {
  return (
    <div className="w-100 row m-0">
      <a
        href={link}
        className="btn btn-sm w-100 btn-sidebar text-hover-light">
        <i className={`${icon} pe-2`}></i>
        <span>{label}</span>
      </a>
    </div>
  );
}
