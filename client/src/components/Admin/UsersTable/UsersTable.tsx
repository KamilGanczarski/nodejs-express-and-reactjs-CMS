import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import { UserFrontendModel } from '../../../utils/interfaces';
import { baseUrl, axiosHeaders } from '../../../utils/tokenAPI';

// Import components
import Form from './Form';
import ScopeBtn from './ScopeBtn';
import SortBtn from './SortBtn';
import TableRow from './TableRow';
import TableRowMobile from './TableRowMobile';
import CollapseTableRow from './CollapseTableRow';
import TablePagination from './TablePagination';

// Prepade date
import { prepareDateInUser } from './Date';

// Import data
import {
  SortValuesData,
  tableRowsLimitBtn,
  acriveEnum,
  SortValueModel,
  ScopeBtnModel
} from './data'

type Props = {
  userType: string;
};

export default function UsersTable({ userType }: Props) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [prevSort, setPrevSort] = useState('webId');
  const [Users, setUsers] = useState<UserFrontendModel[]>([]);
  const [UsersTable, setUsersTable] = useState<UserFrontendModel[]>([]);
  const [SortValues, setSortValues] = useState<SortValueModel[]>([]);

  // Pagination
  const [currPage, setCurrPage] = useState(0);
  const [paginationBtns, setPaginationBtns] = useState<ScopeBtnModel[]>([]);
  const [paginationInput, setPaginationInput] = useState('');

  /**
   * Event date sort
   * @param {Object} a Object to sort 
   * @param {Object} b Object to sort
   * @param {String} sort What is sorted by 
   * @param {Boolean} reverse Descending or ascending order
   * @returns {Boolean} Compared values
   */
  const eventDateSort = (
    a: any,
    b: any,
    sort: string,
    reverse: boolean = false
  ): number => {
    // Check the same values
    if (a[sort][sort] === b[sort][sort]) return 0;

    // nulls sort after anything else
    else if (a[sort][sort] === null) return 1;
    else if (b[sort][sort] === null) return -1;

    // Standard sort
    if (reverse) return b[sort][sort] > a[sort][sort] ? 1 : -1;
    else return a[sort][sort] > b[sort][sort] ? 1 : -1;
  }

  /**
   * Sort Users table be each value from SortValues
   * @param {String} sort Sort value 
   * @param {Number} n Index of object - SortValues
   * @param {Boolean} reverse Descending or ascending order
   */
   const sortUsers = (property: string, n: number, reverse: boolean = false):void => {
    let active: acriveEnum = 'up';
    let NewUsersTable: UserFrontendModel[] = [...UsersTable];
    if (property === prevSort && SortValues[n].active === 'down' || reverse) {
      NewUsersTable.sort((a: any, b: any): number => {
        // Event date sort
        if (property === 'date') return eventDateSort(a, b, property, true);

        // Other values
        return b[property] > a[property] ? 1 : -1;
      });
    } else {
      NewUsersTable.sort((a: any, b: any): number => {
        // Event date sort
        if (property === 'date') return eventDateSort(a, b, property);

        // Other values
        return a[property] > b[property] ? 1 : -1;
      });
      active = 'down';
    }

    // Set new active sort
    let NewSortValues: SortValueModel[] = [...SortValues];
    NewSortValues.forEach(obj => obj.active = 'no');
    NewSortValues[n].active = active;

    setUsersTable(NewUsersTable);
    setPrevSort(property);
    setSortValues(NewSortValues);
  }

  const fetchData = async () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    try {
      const res = await axios.get(`${baseUrl}/api/v1/users`, {
        params: { role: userType },
        headers: axiosHeaders.headers
      });
      let newUsers: any[] = res.data.users;
      newUsers.map((User, id) => {
        User.webId = id;
        // Temporary
        User.files = [];
        // Prepare date
        User.dateShow = prepareDateInUser(User);
      });

      setUsers(newUsers);
      setUsersTable(newUsers);
    } catch (error) {
      setUsers([]);
      // console.log(error);
    }
  }

  /**
   * Show Users from (currPage * rowsPerPage) to next x-th user  
   * @returns Array of object Users
   */
  const showTable = () => {
    let arrayBegin = currPage * rowsPerPage;
    let arrayEnd = arrayBegin + rowsPerPage;
    return UsersTable.slice(arrayBegin, arrayEnd);
  }

  useEffect(() => {
    fetchData()
    setSortValues(SortValuesData)
  }, []);

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
              data-bs-target="#add-customer-modal">
              <span className="text-theme">Add</span>
              <i className="icon-plus theme"></i>
            </button>

            {/* Set tables scope */}
            <ScopeBtn
              UsersLength={Users.length}
              setCurrPage={setCurrPage}
              tableRowsLimitBtn={tableRowsLimitBtn}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setPaginationBtns={setPaginationBtns} />
          </div>
        </div>

        {/* Desktop table */}
        <div className="w-100 row px-0 mx-0 d-none d-lg-none d-xl-block">
          <table className="table col-sm-12 mx-auto mb-4 text-center text-theme-1">
            <thead className="bg-theme-1 text-light">
              <tr>
                {/* Main sort columns */}
                {SortValues.map((btn) => {
                  return (
                    <SortBtn
                      key={btn.id}
                      id={btn.id}
                      name={btn.name}
                      value={btn.value}
                      active={btn.active}
                      sortUsers={sortUsers} />
                  )
                })}

                {/* Gallery preview */}
                {['customer', 'portfolio history wedding'].includes(userType) &&
                  <th className="py-1 border-0">
                    <button className="btn btn-sm w-100 px-0 py-2 fw-bold text-theme-1">
                      Gallery
                    </button>
                  </th>
                }

                {/* Expand to show more info */}
                <td className="py-1 border-0">
                  <button className="btn btn-sm w-100 px-0 py-2 fw-bold text-theme-1">
                    Expand
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              {UsersTable.length > 0 ?
                // Rows with content
                showTable().map((User, index) => {
                  return [
                    <TableRow key={index} RowUser={User} userType={userType} />,
                    <CollapseTableRow
                      key={`collapse-${index}`}
                      webId={User.webId}
                      login={User.login} />
                  ]
                })
                :
                // No content
                <tr className="border-top table-row bg-theme-hover">
                  <td colSpan={7} className="text-center small text-theme-1">
                    No data
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        {/* Mobile table */}
        <div className="w-100 row px-0 mx-0 d-block d-xl-none">
          <table className="table col-sm-12 mx-auto mb-4 text-center">
            <thead className="bg-theme-1 text-theme-1">
              <tr>
                <th className="border-0 btn-sm">#</th>
                <th className="col border-0 text-center btn-sm">Client</th>
              </tr>
            </thead>
            <tbody>
              {UsersTable.length > 0 ?
                // Rows with content
                showTable().map((User, index) => {
                  return [
                    <TableRowMobile
                      key={index}
                      RowUser={User}
                      userType={userType} />,
                  ]
                })
                :
                // No content
                <tr className="border-top table-row bg-theme-hover">
                  <td colSpan={7} className="text-center small text-theme-1">
                    No data
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </article>

      {/* Form */}
      <Form userType={userType} fetchData={fetchData} />

      <TablePagination
        currPage={currPage}
        setCurrPage={setCurrPage}
        paginationBtns={paginationBtns}
        setPaginationBtns={setPaginationBtns}
        paginationInput={paginationInput}
        setPaginationInput={setPaginationInput} />
    </section>
  );
}
