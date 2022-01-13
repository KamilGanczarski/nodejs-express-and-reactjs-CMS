import React, { useState } from 'react'

// Import components
import Form from './Form'
import ScopeBtn from './ScopeBtn'
import SortBtn from './SortBtn'

// Import data
import { SortValues, tableRowsLimitBtn } from './data.js'

export default function UserTable({ userType }) {
  const [tableRowsLimit, setTableRowsLimit] = useState(10);
  const [prevSort, setPrevSort] = useState("id");
  const Users = [];
  const UsersTable = [];

  // Event date sort
  const eventDateSort = (a, b, sort, reverse = false) => {
    // Check the same values
    if (a[sort][sort] == b[sort][sort]) return 0;

    // nulls sort after anything else
    else if (a[sort][sort] == null) return 1;
    else if (b[sort][sort] == null) return -1;
    
    // Standard sort
    if (reverse) return b[sort][sort] > a[sort][sort];
    else return a[sort][sort] > b[sort][sort];
  }

  const sortUsers = (sort, n, reverse = false) => {
    let active = "up";
    if (sort == prevSort && SortValues[n].active == "down" || reverse) {
      UsersTable.sort((a, b) => {
        // Event date sort
        if (sort == 'date') {
          return eventDateSort(a, b, sort, true);
        }
        // Other values
        return b[sort] > a[sort];
      });
    } else {
      UsersTable.sort((a, b) => {
        // Event date sort
        if (sort == 'date') {
          return eventDateSort(a, b, sort);
        }
        // Other values
        return a[sort] > b[sort];
      });
      active = "down";
    }
    SortValues.forEach(obj => {
      obj.active = "no";
    });
    SortValues[n].active = active;
    setPrevSort(sort);
  }

  return (
    <section className="w-100 row m-0 justify-content-center">
      <article className="col-sm-12 col-xl-11 row p-4 mx-auto">
        <div className="w-100 row px-2 mx-0 mb-5 border-bottom">
          {/* Main title */}
          <h5 className="col-12 col-lg-5 px-0 py-2 m-0">Management</h5>

          {/* Left buttons */}
          <div className="col-12 col-lg-7 px-0 pb-1 m-0 d-flex justify-content-end align-items-end">
            {/* Add user - toggle modal */}
            <button
              className="btn btn-sm fw-bold text-hover-theme btn-slide-icon"
              data-bs-toggle="modal"
              data-bs-target="#add-client-modal">
              <span className="text-theme">Add</span>
              <i className="icon-plus theme"></i>
            </button>

            {/* Set tables scope */}
            <ScopeBtn
              tableRowsLimitBtn={tableRowsLimitBtn}
              tableRowsLimit={tableRowsLimit}
              setTableRowsLimit={setTableRowsLimit}
            />
          </div>
        </div>

        {/* Desktop table */}
        <div className="w-100 row px-0 mx-0 d-none d-lg-none d-xl-block">
          <table className="table col-sm-12 mx-auto mb-4 text-center">
            <thead className="bg-theme-1 text-light">
              <tr>
                {SortValues.map((btn) => {
                  return (
                    <SortBtn
                      key={btn.id}
                      btn={btn}
                      sortUsers={sortUsers} />
                  )
                })}
                {['client', 'portfolio history wedding'].includes(userType) &&
                  <th className="py-1 border-0">
                    <button className="btn btn-sm w-100 px-0 py-2 fw-bold text-theme-1">
                      gallery
                    </button>
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              {Users.length == 0 &&
                <tr className="border-top table-row bg-theme-hover">
                  <td colSpan="7" className="text-center small text-theme-1">
                    No data
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </article>

      {/* Form */}
      <Form userType={userType} />
    </section>
  )
}
