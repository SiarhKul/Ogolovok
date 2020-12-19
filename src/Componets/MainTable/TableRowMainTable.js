import React from "react";
import classes from "./MainTable.module.css";

export default function TableRowMainTable(props) {
   const {
      updateValueInput,
      id,
      pile,
      marksOM,
      tube,
      thinkness,
      gab1,
      gab2,
      gab3,
      gab4,
      gab5,
      gab6,
      amount,
      removeRow } = props;

   // const Field = (props) => {
   //    return (
   //       <td className="p-0">
   //          <input {...props} onChange={(e) => updateValueInput(e, id)} />
   //       </td>
   //    )
   // }

   return (
      <tr>
         <td className="p-0" >
            <input className={classes.inputIcon} name="pile" type="number" value={pile || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="marksOM" type="text" value={marksOM || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         {/* <Field name='tube' type="number" value={tube || ''} /> */}
         <td className="p-0">
            <input name="tube" type="number" value={tube || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="thinkness" type="number" value={thinkness || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="gab1" type="number" value={gab1 || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="gab2" type="number" value={gab2 || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="gab3" type="number" value={gab3 || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="gab4" type="number" value={gab4 || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="gab5" type="number" value={gab5 || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="gab6" type="number" value={gab6 || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <input name="amount" type="number" value={amount || ""} onChange={(e) => updateValueInput(e, id)} />
         </td>
         <td className="p-0">
            <button type="button" className={` btn-primary ${classes.btnDelete}`} onClick={() => { removeRow(id); }}>
               <i className={"fas fa-times-circle "} ></i>
            </button>
         </td>

      </tr>

   );
}
