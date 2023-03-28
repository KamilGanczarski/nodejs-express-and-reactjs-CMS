import React from 'react';

// Utils
import { fetchUsersParams } from '../../interfaces/interfaces';

interface ScopeBtn {
  value: number;
  active: string;
}

type Props = {
  currPage: number;
  setCurrPage: (num: number) => void;
  fetchData: ({}: fetchUsersParams) => void;
  paginationBtns: ScopeBtn[];
  setPaginationBtns: (btns: ScopeBtn[]) => void;
  paginationInput: string;
  setPaginationInput: (value: string) => void;
};

export default function TablePagination({
  currPage,
  setCurrPage,
  fetchData,
  paginationBtns,
  setPaginationBtns,
  paginationInput,
  setPaginationInput
}: Props) {
  /**
   * @param {Number} n Number from 0 to paginationBtns.length - 1
   */
  const changePage = (n: number): void => {
    if (n >= 0 && n < paginationBtns.length) {
      if (n > 3 && n < paginationBtns.length - 4) {
        setPaginationInput((n + 1).toString());
      } else {
        setPaginationInput('');
      }

      let newPaginationBtns = [...paginationBtns];
      newPaginationBtns.forEach((obj, i) => {
        obj.active = i === n ? 'active' : '';
      });
      setPaginationBtns(newPaginationBtns);
      setCurrPage(n);
      fetchData({ sort: '', filter: '', page: n, perPage: 0 });
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    changePage(parseInt(paginationInput) - 1);
  }

  if (paginationBtns.length < 1) {
    return <article></article>;
  }

  return (
    <article className="col-sm-11 row pb-4 mx-auto justify-content-center">
      <button
        disabled={currPage === 0}
        className="btn btn-sm w-auto px-1 mx-1 fw-bold text-hover-theme"
        onClick={()=>changePage(currPage - 1)}>
        <i className="icon-left-open h5 m-0"></i>
      </button>

      {paginationBtns.length < 10 &&
        <div className="w-auto">
          {paginationBtns.map((btn, index) => {
            return (
              <button
                key={index}
                className={`btn btn-sm w-auto px-2 mx-1 fw-bold text-hover-theme ${btn.active}`}
                onClick={()=>changePage(btn.value)}>
                {btn.value + 1}
              </button>
            )
          })}
        </div>
      }

      {paginationBtns.length >= 10 &&
        <div className="w-auto">
          {paginationBtns.slice(0, 4).map((btn, index) => {
            return (
              <button
                key={index}
                className={`btn btn-sm w-auto px-2 mx-1 fw-bold text-hover-theme ${btn.active}`}
                onClick={()=>changePage(btn.value)}>
                {btn.value + 1}
              </button>
            )
          })}
        </div>
      }

      {paginationBtns.length >= 10 &&
        <form onSubmit={onSubmitHandler} className="w-auto">
          <input
            type="number"
            className="form-control form-control-sm w-auto mt-1 text-center form-control-short"
            value={paginationInput}
            onChange={(e)=>setPaginationInput(e.target.value)} />
        </form>
      }

      {paginationBtns.length >= 10 &&
        <div className="w-auto">
          {paginationBtns
            .slice(paginationBtns.length - 4, paginationBtns.length)
            .map((btn, index) => {
              return (
                <button
                  key={index}
                  className={`btn btn-sm w-auto px-2 mx-1 fw-bold text-hover-theme ${btn.active}`}
                  onClick={()=>changePage(btn.value)}>
                  {btn.value + 1}
                </button>
              )
            })
          }
        </div>
      }

      <button
        disabled={currPage === paginationBtns.length - 1}
        className="btn btn-sm w-auto px-1 mx-1 fw-bold text-hover-theme"
        onClick={()=>changePage(currPage + 1)}>
        <i className="icon-right-open h5 m-0"></i>
      </button>
    </article>
  );
}
