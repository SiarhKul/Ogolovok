import React from "react";
import classes from "./PaginationTable.module.css";
const PaginationTable = ({
  previousPage,
  canPreviousPage,
  pageIndex,
  pageOptions,
  nextPage,
  canNextPage,
  gotoPage,
  pageCount,
  pageSize,
  setPageSize
}) => {
  return (
    <div className={classes.inrow}>

      <div>
        <button
          type="button"
          className="btn btn-info p-2 mt-0"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <i className="fas fa-chevron-left"></i>
          <i className="fas fa-chevron-left"></i>
        </button>

        <button
          type="button"
          className="btn btn-primary p-2 mt-0"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>

      <div className={classes.flexshrink}>
        <input type="number" defaultValue={pageIndex + 1} onChange={e => {
          const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(pageNumber);
        }} />

        <span>
          Страница{" "}
          <small>{pageIndex + 1} of {pageOptions.length}</small>
        </span>
      </div>

      <div className="form-group ">
        <select className="form-control mt-0" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [10, 15, 20, 25, 30, 35, 40, 45, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>Показать {pageSize} </option>
            ))
          }
        </select>
      </div>

      <div>
        <button
          type="button"
          className="btn btn-primary p-2 mt-0"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <button
          type="button"
          className="btn btn-info p-2 mt-0"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canPreviousPage}
        >
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
