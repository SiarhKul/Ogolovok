import React from "react";
import TableWelderRowNaks from "./TableWelderRowNaks";
import { welders } from "../../../Database/database_welders.js";
import classes from "./Tableweldernaks.module.css";

const TableWelderNaks = () => {
  const nameHeaderTable = [
    "ФИО",
    "№ Удостоверения",
    "Способ сварки",
    "Клеймо",
    "Срок действия",
    "ГТУ",
  ];

  return (
    <div className="table-responsive">
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            {nameHeaderTable.map((h, i) => <th key={i} className={classes.border} scope="col">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {welders.map(({ ...welder }, i) =>
            <TableWelderRowNaks key={i} {...welder} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWelderNaks;
