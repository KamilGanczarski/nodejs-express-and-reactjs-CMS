import React from 'react';

export default function CollapseTableRow({ User, userType }) {
  return (
    <tr>
      <td className="p-0 border-0" colSpan="100%">
        <div
          className="collapse bg-transparent"
          id={`table-collape-${User.webId}`}>
          <div className="px-5 py-3">
            <p className="p-4 m-0 border-top border-dark">{User.login}</p>
          </div>
        </div>
      </td>
    </tr>
  )
}
