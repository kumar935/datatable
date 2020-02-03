import React, { Component, useState, useEffect, useRef } from "react";
import useRows from "./useRows";
import useRenderRows from "./useRenderRows";
import useScroll from "./useScroll";
const colsAreValid = cols => {
  let colIds = cols.map(col => col.id);
  let uniqueColumns = new Set(colIds).size === colIds.length;
  return uniqueColumns;
};

function DataTable({ rows, columns, filterable, pagination, onRowClick }) {
  // let [rows, setRows] = useState([]);
  let [page, setPage] = useState(0);
  let [pageSize, setPageSize] = useState(pagination ? pagination.pageSize : 10);
  let [filters, setFilters] = useState([]);
  let [filtersMap, setFiltersMap] = useState([]);

  let [visibleRows] = useRows({
    filters,
    page,
    pageSize,
    pagination,
    rows
  });
  let [renderedRows] = useRenderRows({
    onClickRow,
    columns,
    rows: visibleRows
  });

  const pageSizeRef = useRef(pageSize);
  const rowsRef = useRef(rows);

  useEffect(() => {
    rowsRef.current = rows;
    pageSizeRef.current = pageSize;
  }, [rows, pageSize]);

  useScroll({
    rows,
    pagination,
    atBottom: () => {
      onClickNextPage();
    }
  });

  function onClickPrevPage() {
    if (page > 0) setPage(--page);
  }

  function onClickNextPage() {
    // console.log('logging getPages(): ', rows.length);
    let _pages = Math.ceil(rowsRef.current.length / pageSizeRef.current);
    if (page + 1 >= _pages) return;
    if (pagination.type === "infinite") {
      let nextPageSize = pageSizeRef.current + (pagination.nextPageSize || 10);
      setPageSize(nextPageSize);
    } else {
      setPage(++page);
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
    setFilters(filtersListFromMap);
    setFiltersMap(filtersMap);
  }

  function onClickRow(row, index) {
    onRowClick(row, index);
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
        <tbody className="rows">{renderedRows}</tbody>
      </table>
      {pagination ? (
        <div className="pagination">
          {pagination.type !== "infinite" ? (
            <React.Fragment>
              <button className="btn" onClick={onClickPrevPage}>
                Previous
              </button>
              <input type="text" name="pageNo" value={page + 1} disabled />
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
