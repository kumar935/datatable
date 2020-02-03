import React, { useState, useEffect } from "react";
import uuidv4 from "uuid/v4";

export default function useRenderRows({ columns, rows, onClickRow }) {

  function getRow(row, index) {
    let finalRow = columns.map(col => {
      let tdClass = "";
      if (col.numeric) tdClass += "numeric";
      if (col.longtext) tdClass += "longtext";

      if (col.Cell) {
        let { Cell } = col;
        return (
          <td>
            <Cell row={row} />
          </td>
        );
      }

      return (
        <td key={uuidv4()} className={tdClass} title={row[col.id]}>
          {row[col.id]}
        </td>
      );
    });
    let wrappedFinalRow = (
      <tr key={uuidv4()} onClick={() => onClickRow(row, index)}>
        {finalRow}
      </tr>
    );
    return wrappedFinalRow;
  }

  let renderedRows = rows.map((row, index) => getRow(row, index))

  return [renderedRows];
}
