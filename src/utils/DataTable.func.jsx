import React, { Component, useState, useEffect } from "react";
import uuidv4 from "uuid/v4";

const colsAreValid = cols => {
  let colIds = cols.map(col => col.id);
  let uniqueColumns = new Set(colIds).size === colIds.length;
  return uniqueColumns;
};

function DataTable({ rows, columns, filterable, pagination, onRowClick, onRef }) {
  // let [rows, setRows] = useState([]);
  let [page, setPage] = useState(0);
  let [pageSize, setPageSize] = useState(pagination ? pagination.pageSize : 10);
  let [filters, setFilters] = useState([]);
  let [filtersMap, setFiltersMap] = useState([]);

  function getPages () {
    return Math.ceil(rows.length / pageSize);
  };

  function isBottom (el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  function trackScrolling() {
    const wrappedElement = document.querySelector("#app");
    if (isBottom(wrappedElement)) {
      onClickNextPage();
      console.log("bottom reached");
      // document.removeEventListener('scroll', trackScrolling);
    }
  }

  useEffect(() => {
    onRef && onRef(this); // does this still work?
    if (
      pagination &&
      pagination.type === "infinite" &&
      !pagination.infiniteScrollBtn
    ) {
      document.addEventListener("scroll", trackScrolling);
    }
    return () => {
      onRef && onRef(null); // does this still work?
      document.removeEventListener("scroll", trackScrolling);
    };
  }, []);

  function onClickPrevPage () {
    if (page > 0) setPage( --page );
  }

  function onClickNextPage () {
    if (page + 1 >= getPages()) return;
    if (pagination.type === "infinite") {
      setPageSize(pageSize + (pagination.nextPageSize || 10))
    } else {
      setPage( ++page )
    }
  }

  if (!colsAreValid(columns)) {
    console.error("error in Datatable: duplicate column ids");
    return "Duplicate col ids, check passed columns config";
  }

  function handleFilterChange(e, col) {
    let newVal = e.target.value;
    filtersMap[col.id] = newVal;
    let filtersListFromMap = Object.entries(filtersMap).map(v => ({
      id: v[0],
      value: v[1]
    }));
    setFilters({ filters: filtersListFromMap });
    setFiltersMap({ filtersMap });
  }

  function filterRow(row, index) {
    let matchesFilters = filters
      .map(filter => {
        let rowValueStr = row[filter.id].toString();
        let filterValueStr = filter.value.toString();
        return rowValueStr.includes(filterValueStr);
      })
      .every(v => v === true);
    return matchesFilters;
  }

  function paginationFilter(row, index) {
    let rowInCurrentPage = true;
    if (pagination) {
      rowInCurrentPage =
        index >= page * pageSize && index < (page + 1) * pageSize;
    }
    return rowInCurrentPage;
  }

  function onClickRow(row, index) {
    onRowClick(row, index);
  }

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

  function getCurrentRows() {
    return rows.filter(filterRow).filter(paginationFilter);
  }

  return (
    <div>
      <table className="datatable">
        <thead className="col-headers">
          <tr>
            {columns.map(col => (
              <th key={col.id} style={{ width: col.width || "auto" }}>
                <div>
                  <div>{col.label}</div>
                  <div>{col.Header || ""}</div>
                  <div>
                    {filterable && col.filterable !== false ? (
                      <input
                        type="text"
                        name="filter"
                        onChange={e => handleFilterChange(e, col)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="rows">
          {getCurrentRows().map((row, index) => getRow(row, index))}
        </tbody>
      </table>
      {pagination ? (
        <div className="pagination">
          {pagination.type !== "infinite" ? (
            <React.Fragment>
              <button className="btn" onClick={onClickPrevPage}>
                Previous
              </button>
              <input
                type="text"
                name="pageNo"
                value={page + 1}
                disabled
              />
            </React.Fragment>
          ) : (
            ""
          )}
          <button
            className="btn"
            onClick={onClickNextPage}
            style={
              pagination.type === "pages" || pagination.infiniteScrollBtn
                ? {}
                : { display: "none" }
            }
          >
            {pagination.type === "infinite" ? "Load More" : "Next"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DataTable;

/*
refactoring:
- provider consumer
- separate scroll to bottom func
*/
