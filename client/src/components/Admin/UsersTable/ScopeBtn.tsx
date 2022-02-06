import React, { useEffect, useState } from 'react';

// Import data
import {
  ScopeBtnModel
} from './data.js'

type Props = {
  UsersLength: number;
  setCurrPage: (num: number) => void;
  tableRowsLimitBtn: ScopeBtnModel[];
  rowsPerPage: number;
  setRowsPerPage: (limit: number) => void;
  setPaginationBtns: (buttons: ScopeBtnModel[]) => void;
};

export default function ScopeBtn({
  UsersLength,
  setCurrPage,
  tableRowsLimitBtn,
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
  const changeUsersCountOnPage = (limit: number, n: number) => {
    setRowsPerPage(limit);
    tableRowsLimitBtn.forEach(obj => obj.active = '');
    tableRowsLimitBtn[n].active = 'active';
    createPaginationButtons(limit);
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
              onClick={()=>changeUsersCountOnPage(btn.value, index)}>
              {btn.value}
            </button>
          )
        })}
      </div>
    </div>
  );
}
