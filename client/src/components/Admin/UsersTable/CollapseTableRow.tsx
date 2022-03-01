import React from 'react';

type Props = {
  userId: string;
  login: string;
};

export default function CollapseTableRow({ userId, login }: Props) {
  return (
    <tr>
      <td className="p-0 border-0" colSpan={100}>
        <div
          className="collapse bg-transparent"
          id={`table-collape-${userId}`}>
          <div className="px-5 py-3">
            <p className="p-4 m-0 border-top border-dark">{login}</p>
          </div>
        </div>
      </td>
    </tr>
  );
}
