import React from 'react';

type Props = {
  title: string;
}

export default function ModalTitle({ title }: Props) {
  return (
    <div className="w-100 row p-0 m-0">
      <h5 className="w-100 p-3 mb-4 border-bottom border-2 border-theme">
        <span className="fw-bold text-theme">{title}</span>
      </h5>
    </div>
  )
}