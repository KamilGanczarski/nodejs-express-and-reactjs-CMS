import React, { useEffect } from 'react';

// Utils
import { fetchUsersParams, ScopeBtnModel } from '../../interfaces/interfaces';

// Import data
import { tableRowsLimitBtn } from './data'

type Props = {
  UsersLength: number;
  setCurrPage: (num: number) => void;
  fetchData: ({}: fetchUsersParams) => void;
  rowsPerPage: number;
  setRowsPerPage: (limit: number) => void;
  setPaginationBtns: (buttons: ScopeBtnModel[]) => void;
};

export default function ScopeBtn({
  UsersLength,
  setCurrPage,
  fetchData,
  rowsPerPage,
  setRowsPerPage,
  setPaginationBtns
}: Props) {
  // Calc how many buttons in pagination
  const createPaginationButtons = (limit: number): void => {
    const btnsCount = Math.ceil(UsersLength / limit);
    let newPaginationBtns = [];
    for (let i = 0; i < btnsCount; i++) {
      newPaginationBtns.push({
        value: i,
        active: (i === 0) ? 'active' : ''
      });
    }
    setPaginationBtns(newPaginationBtns);
    setCurrPage(0);
  }

  /**
   * Change users count on page
   * @param {Number} limit Count how many users on page
   * @param {Number} n Order number to point active tableRowsLimitBtn's element
   */
  const changeUsersCountPerPage = (limit: number, n: number) => {
    setRowsPerPage(limit);
    tableRowsLimitBtn.forEach(obj => obj.active = '');
    tableRowsLimitBtn[n].active = 'active';
    createPaginationButtons(limit);
    setCurrPage(0);
    fetchData({ sort: '', filter: '', page: 0, perPage: limit });
  }

  useEffect(() => {
    createPaginationButtons(rowsPerPage);
  }, [UsersLength]);

  return (
    <div className="dropdown w-auto">
      <button
        className="btn btn-sm w-auto fw-bold btn-slide-icon"
        id="dropdown-menu-5"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <span className="text-theme">Table scope: {rowsPerPage}</span>
        <i className="icon-down-open-mini theme"></i>
      </button>
      <div
        className="dropdown-menu shadow border border-theme bg-theme"
        aria-labelledby="dropdown-menu-5">
        {tableRowsLimitBtn.map((btn, index) => {
          return (
            <button
              key={index}
              className={`w-100 btn px-0 py-1 rounded-0 text-center text-hover-theme ${btn.active}`}
              onClick={()=>changeUsersCountPerPage(btn.value, index)}>
              {btn.value}
            </button>
          )
        })}
      </div>
    </div>
  );
}
