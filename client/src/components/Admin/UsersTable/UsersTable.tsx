import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import {
  UserFrontendModel,
  fetchUsersParams,
  ScopeBtnModel,
  acriveEnum,
  SortValueModel
} from '../../../utils/interfaces';
import { baseUrl, axiosHeaders } from '../../../utils/tokenAPI';

// Import components
//    User
import Form from './Form';
import TableRow from './User/TableRow';
import TableRowMobile from './User/TableRowMobile';
import CollapseTableRow from './User/CollapseTableRow';
//    Event
import TableRowEvent from './Event/TableRow';
import TableRowMobileEvent from './Event/TableRowMobile';
import CollapseTableRowEvent from './Event/CollapseTableRow';
//    Table elements
import ScopeBtn from '../../Table/ScopeBtn';
import SortBtn from '../../Table/SortBtn';
import TablePagination from '../../Table/TablePagination';

// Prepade date
import { prepareDateInUser } from './Date';

// Import data
import { SortValuesDataUser, SortValuesDataCalendar } from './data'

type Props = {
  userType: string;
};

export default function UsersTable({ userType }: Props) {
  const [ prevSort, setPrevSort ] = useState('userId');
  const [ Users, setUsers ] = useState<UserFrontendModel[]>([]);
  const [ SortValues, setSortValues ] = useState<SortValueModel[]>([]);

  // Filters and sort
  const [ sortParams, setSortParams ] = useState<string>('');
  const [ filterParams, setFilterParams ] = useState<string>(`role=${userType}`);

  // Pagination
  const [ currPage, setCurrPage ] = useState(0);
  const [ paginationBtns, setPaginationBtns ] = useState<ScopeBtnModel[]>([]);
  const [ paginationInput, setPaginationInput ] = useState('');
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ usersTotalLength, setUsersTotalLength ] = useState(0);

  /**
   * Sort Users table be each value from SortValues
   * @param {String} sort Sort value
   * @param {Number} n Index of object - SortValues
   * @param {Boolean} reverse Descending or ascending order
   */
   const sortUsers = (value: string, n: number, reverse: boolean = false):void => {
    let active: acriveEnum = 'up';
    if (value === prevSort && SortValues[n].active === 'down' || reverse) {
      value = `${value} DESC`;
      setSortParams(`${value}`);
    } else {
      setSortParams(`${value}`);
      active = 'down';
    }

    // Set new active sort
    let NewSortValues: SortValueModel[] = [...SortValues];
    NewSortValues.forEach(obj => obj.active = 'no');
    NewSortValues[n].active = active;

    setPrevSort(value);
    setSortValues(NewSortValues);
    fetchData({ sort: value, filter: '', page: 0, perPage: 0 });
  }

  const fetchData = async ({
    sort = '',
    filter = '',
    page = 0,
    perPage = 0
  }: fetchUsersParams) => {
    // If params isn't set get values from useState
    sort = sort ? sort : sortParams;
    filter = filter ? filter : filterParams;
    perPage = perPage ? perPage : rowsPerPage;

    // If token in local storage is set
    if (!localStorage.token) return;

    try {
      const res = await axios.get(`${baseUrl}/api/v1/users`, {
        params: { page, perPage, sort, filter },
        headers: axiosHeaders.headers
      });

      let newUsers: any[] = res.data.users;

      setUsersTotalLength(res.data.tableCount);
      newUsers.map((User, id) => {
        // Temporary
        User.files = [];
        // Prepare date
        User.dateShow = prepareDateInUser(User);
      });

      setUsers(newUsers);
    } catch (error) {
      setUsers([]);
      // console.log(error);
    }
  }

  const setSortData = () => {
    if (userType === 'event') {
      setSortValues(SortValuesDataCalendar);
    } else {
      setSortValues(SortValuesDataUser);
    }
  }

  useEffect(() => {
    fetchData({ sort: '', filter: '', page: 0, perPage: 0 });
    setSortData();
  }, []);

  return (
    <article className="w-100 row m-0 justify-content-center">
      <section className="col-sm-12 col-xl-11 row p-4 mx-auto">
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
              UsersLength={usersTotalLength}
              setCurrPage={setCurrPage}
              fetchData={fetchData}
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
                      sortable={btn.sortable}
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
              {Users.length > 0 ?
                // Rows with content
                Users.map((User, index) => {
                  // Event row
                  if (userType === 'event') {
                    return [
                      <TableRowEvent
                        key={index} 
                        RowUser={User}
                        userType={userType} />,
                      <CollapseTableRowEvent
                        key={`collapse-${index}`}
                        userId={User.id}
                        login={User.login} />
                    ]
                  }
                  // User row
                  return [
                    <TableRow
                      key={index} 
                      RowUser={User}
                      userType={userType} />,
                    <CollapseTableRow
                      key={`collapse-${index}`}
                      userId={User.id}
                      login={User.login} />
                  ]
                })
                :
                // No content
                <tr className="border-top table-row bg-theme-hover">
                  <td
                    colSpan={userType === 'event' ? 9 : 7 }
                    className="text-center small text-theme-1">
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
              {Users.length > 0 ?
                // Rows with content
                Users.map((User, index) => {
                  // Event row
                  if (userType === 'event') {
                    return (
                      <TableRowMobileEvent
                        key={index}
                        RowUser={User}
                        userType={userType} />
                    )
                  }
                  return (
                    <TableRowMobile
                      key={index}
                      RowUser={User}
                      userType={userType} />
                  )
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
      </section>

      {/* Form */}
      <Form
        userType={userType}
        fetchData={fetchData} />

      <TablePagination
        currPage={currPage}
        setCurrPage={setCurrPage}
        fetchData={fetchData}
        paginationBtns={paginationBtns}
        setPaginationBtns={setPaginationBtns}
        paginationInput={paginationInput}
        setPaginationInput={setPaginationInput} />
    </article>
  );
}
