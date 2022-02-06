import React from 'react';

type Props = {
  id: number;
  name: string;
  value: string;
  active: string;
  sortUsers: (value: string, id: number) => void;
};

export default function SortBtn({ id, name, value, active, sortUsers }: Props) {
  return (
    <th className="py-1 border-0">
      <button
        onClick={()=>sortUsers(value, id)}
        className="btn btn-sm w-100 px-0 py-2 text-theme-1">
        {/* Title */}
        <span className="fw-bold me-2">{name}</span>

        {/* Icon */}
        {{
          'no': <i className="icon-down-open text-theme-1-disable"></i>,
          'down': <i className="icon-down-open"></i>,
          'up': <i className="icon-up-open"></i>
        }[active]}
      </button>
    </th>
  );
}
