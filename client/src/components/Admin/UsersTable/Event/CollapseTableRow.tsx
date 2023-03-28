import React from 'react';

type Props = {
  userId: string;
  login: string;
};

export default function CollapseTableRowEvent({ userId, login }: Props) {
  return (
    <tr>
      <td className="p-0 border-0" colSpan={100}>
        <div
          className="collapse bg-transparent"
          id={`table-collape-${userId}`}>
          <div className="px-5 py-3 border-top border-bottom border-dark">
            <p className="p-3 m-0">Login: {login}</p>

            <div className="w-100 pb-3">
              <button
                // v-on:click="Calendar_edit_vue.edit_event_f(Event, i)"
                data-bs-toggle="modal"
                data-bs-target="#edit_event"
                className="btn btn-sm py-0 fw-bold text-hover-custom">
                Edit
              </button>
              <button 
                // v-on:click="App_vue.confirm_window_f(Event, 'delete event')"
                data-bs-toggle="modal"
                data-bs-target="#confirm"
                className="btn btn-sm py-0 fw-bold text-hover-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
