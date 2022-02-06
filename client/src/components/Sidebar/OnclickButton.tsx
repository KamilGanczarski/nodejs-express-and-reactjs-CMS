import React from 'react';

type Props = {
  onclick: () => void;
  icon: string;
  label: string;
};

export default function OnclickButton({ onclick, icon, label }: Props) {
  return (
    <div className="w-100 row m-0">
      <button
        className="btn btn-sm w-100 btn-sidebar text-hover-light"
        onClick={onclick}>
        <i className={`${icon} pe-2`}></i>
        <span>{label}</span>
      </button>
    </div>
  );
}
