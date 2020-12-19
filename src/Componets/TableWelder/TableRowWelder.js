import React from 'react'
import classes from './TableWelder.module.css'

const TableRowWelder = (props) => {
  const {
    id,
    removeRow,
    pile,
    marksOM,
    tube,
    thinkness,
    updateValueInput
  } = props


  return (
    <>
      <td className="p-0" >
        <input name='pile' type="number" value={pile} onChange={(e) => updateValueInput(e, id)} />
      </td>
      <td className="p-0">
        <input name='marksOM' type="text" value={marksOM} onChange={(e) => updateValueInput(e, id)} />
      </td>
      <td className="p-0">
        <input name='tube' type="number" value={tube} onChange={(e) => updateValueInput(e, id)} />
      </td>
      <td className="p-0">
        <input name='thinkness' type="number" value={thinkness} onChange={(e) => updateValueInput(e, id)} />
      </td>
      <td className="p-0">
        <input name='thinkness' type="number" value={thinkness} onChange={(e) => updateValueInput(e, id)} />
      </td>
      <td className="p-0">
        <button
          type="button"
          className={` btn-primary ${classes.btnDelete}`}
          onClick={() => { removeRow(id) }}
        >
          <i className={`fas fa-times-circle `} ></i>
        </button>
      </td>
    </>
  )
}

export default TableRowWelder
