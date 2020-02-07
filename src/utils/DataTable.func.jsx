import React, { Component, useState, useEffect, useRef } from "react";
import useRows from "./useRows";
import useRenderRows from "./useRenderRows";
import useScroll from "./useScroll";
const colsAreValid = cols => {
  let colIds = cols.map(col => col.id);
  let uniqueColumns = new Set(colIds).size === colIds.length;
  return uniqueColumns;
};

function DataTable({
  rows,
  columns,
  manual,
  filterable,
  pagination,
  onRowClick,
  onChange,
  onFetchData = () => {}
}) {
  // let [rows, setRows] = useState([]);
  let [page, setPage] = useState(0);
  let [pageSize, setPageSize] = useState(pagination ? pagination.pageSize : 10);
  let [filters, setFilters] = useState([]);
  let [filtersMap, setFiltersMap] = useState([]);

  let [visibleRows] = useRows({
    manual,
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
  const pageRef = useRef(page);

  useEffect(() => {
    rowsRef.current = rows;
    pageSizeRef.current = pageSize;
    pageRef.current = page;
  }, [rows, pageSize, page]);

  useEffect(() => {
    if(manual){
      onFetchData({
        page, pageSize, filters
      })
    }
  }, [page, pageSize, filters])

  useEffect(() => {
    setPage(0);
    setPageSize(pagination.pageSize);
  }, [pagination.type]);


  useScroll({
    rows,
    pagination,
    atBottom: () => {
      onClickNextPage();
    },
    atTop: () => {
      // if(pagination.maxRows) onClickPrevPage();
    }
  });

  function onClickPrevPage() {
    if(pagination.type === "infinite"){
      let prevPage = pageRef.current - pagination.nextPageSize;
      prevPage = prevPage >= 0 ? prevPage : 0;
      if(pageSizeRef.current - prevPage > pagination.maxRows){
        setPage(prevPage);
        setPageSize(pagination.maxRows);
      } else {
        setPage(prevPage)
      }
    } else {
      if (pageRef.current > 0) setPage(--pageRef.current);
    }
  }

  function onClickNextPage() {
    // console.log('logging getPages(): ', rows.length);
    if (pagination.type === "infinite") {
      let nextPageSize = pageSizeRef.current + (pagination.nextPageSize || 10);
      if (pagination.maxRows && (nextPageSize) > pagination.maxRows) {
        nextPageSize = pagination.maxRows;
        setPage(pageRef.current + pagination.nextPageSize); // page is row index for infinite scroll
        if(!pagination.infiniteScrollBtn){
          let _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
          let newScrollTop = document.documentElement.scrollTop - (_docHeight * 0.08)
          document.documentElement.scrollTop = newScrollTop;
        }
      }
      setPageSize(nextPageSize);
    } else {
      let _pages = manual ? Infinity : Math.ceil(rowsRef.current.length / pageSizeRef.current);
      if (pageRef.current + 1 >= _pages) return;
      setPage(++pageRef.current);
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

  function backToTop () {
    setPage(0);
    setPageSize(pagination.maxRows);
  }

  const onChangeLocal = argObj => {
    onChange({ ...argObj, visibleRows });
  };

  return (
    <div>
      <table className="datatable">
        <thead className="col-headers">
          <tr>
            {columns.map(col => {
              let { Header } = col;
              return (
                <th key={col.id} style={{ width: col.width || "auto" }}>
                  <div>
                    <div>{col.label}</div>
                    {/* <div>{col.Header || ""}</div> */}
                    {typeof col.Header === "function" ? (
                      <div>
                        <Header onChange={onChangeLocal} />
                      </div>
                    ) : (
                      <div>{col.Header || ""}</div>
                    )}

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
              );
            })}
          </tr>
        </thead>
        {pagination.type === "infinite" && page > 0 ? (
          <tr>
            <td colspan="100" style={{textAlign: "center", cursor: "pointer"}}>
              <button onClick={onClickPrevPage} className="btn" style={{marginRight: 20}}>
                Load Prev Data
              </button>
              <button onClick={backToTop} className="btn">
                Back To Top
              </button>
            </td>
          </tr>
        ) : ""}
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

DataTable.getVisibleRows = () => {};

export default DataTable;
