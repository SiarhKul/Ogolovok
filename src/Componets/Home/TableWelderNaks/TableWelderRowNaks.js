import React from "react";

const TableWelderRowNaks = (props) => {
  const {
    GTD,
    idDocument,
    method,
    person,
    stamp,
    tern,
  } = props;
  return (
    <tr>
      <th scope="row">{person}</th>
      <td>{idDocument}</td>
      <td>{method}</td>
      <td>{stamp}</td>
      <td>{tern}</td>
      <td>{GTD}</td>
    </tr>
  );
};

export default TableWelderRowNaks;
