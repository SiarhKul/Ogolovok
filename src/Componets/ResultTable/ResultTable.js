import React from "react";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../Firebase/Firebase.js";
import { alertError } from "../../Alerts/Alert.js";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { columns } from "./columns";
import classes from "../../Componets/ResultTable/ResultTable.module.css";
import GlobalFilter from "./GlobalFilter/GlobalFilter.js";
import PaginationTable from "./PaginationTable/PaginationTable.js";


const ResultTable = () => {
  const [rowsData, setRowsData] = useState([]);
  const [position, setPosition] = useState("");
  const column = useMemo(() => columns, []);
  // const data = useMemo(() => rowsData, []);
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize
  } = useTable(
    {
      columns: column,
      data: rowsData
    }, useFilters, useGlobalFilter, useSortBy, usePagination);
  const { pageIndex, pageSize, globalFilter } = state;

  console.log(rowsData);

  useEffect(() => {
    db.ref("kerchif")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          setRowsData(childSnapshot.val());
          setPosition(childSnapshot.key);
        });
      })
      .catch(error => alertError(error.message));

  }, []);

  return (
    <div>
      <div className="text-center">
        <h2 className="p-2">Позиция {position}</h2>
      </div>
      <div className="container p-5 border border-info rounded">
        <div className=" row ">

          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

          <div className="table-responsive">
            <table className="table table-sm table-bordered table-striped table-hover" {...getTableProps()}>

              <thead>
                {
                  headerGroups.map((headerGroup, i) => (
                    <tr className={classes.border} key={i} {...headerGroup.getHeaderGroupProps}>
                      {
                        headerGroup.headers.map((column, i) => (
                          <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                            <p className={classes.verticalText}>
                              {column.render("Header")}
                              <span className={classes.sorting}>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? <i className={`fas fa-arrow-down ${classes.arrow}`}></i>
                                    : <i className={`fas fa-arrow-up ${classes.arrow}`}></i>
                                  : ""}
                              </span>
                            </p>
                            <div>{column.canFilter ? column.render("Filter") : null}</div>
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>

              <tbody {...getTableBodyProps()}>
                {
                  page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr key={i} {...row.getRowProps()}>
                        {
                          row.cells.map((cell, i) => {
                            return <td key={i} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>

            </table>

            <PaginationTable
              previousPage={previousPage}
              canPreviousPage={canPreviousPage}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              nextPage={nextPage}
              canNextPage={canNextPage}
              gotoPage={gotoPage}
              pageCount={pageCount}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;
