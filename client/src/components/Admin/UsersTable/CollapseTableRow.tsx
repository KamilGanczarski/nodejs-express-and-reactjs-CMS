import React from 'react';

type Props = {
  webId: number;
  login: string;
};

export default function CollapseTableRow({ webId, login }: Props) {
  return (
    <tr>
      <td className="p-0 border-0" colSpan={100}>
        <div
          className="collapse bg-transparent"
          id={`table-collape-${webId}`}>
          <div className="px-5 py-3">
            <p className="p-4 m-0 border-top border-dark">{login}</p>
          </div>
        </div>
      </td>
    </tr>
  );
}
