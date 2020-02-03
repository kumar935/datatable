import React, { Component } from "react";
import uuidv4 from "uuid/v4";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      filtersMap: {},
      page: 0,
      pageSize: props.pagination ? props.pagination.pageSize : 10
    };
  }

  getPages = () => {
    return Math.ceil(this.props.rows.length / this.state.pageSize);
  };

  isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    let { pagination } = this.props;
    if (
      pagination &&
      pagination.type === "infinite" &&
      !pagination.infiniteScrollBtn
    ) {
      document.addEventListener("scroll", this.trackScrolling);
    }
  }
  componentWillUnmount() {
    this.props.onRef && this.props.onRef(null);
    document.removeEventListener("scroll", this.trackScrolling);
  }
  trackScrolling = () => {
    const wrappedElement = document.querySelector("#app");
    if (this.isBottom(wrappedElement)) {
      this.onClickNextPage();
      console.log("bottom reached");
      // document.removeEventListener('scroll', this.trackScrolling);
    }
  };

  getRow = (row, index) => {
    let { columns } = this.props;
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
      <tr key={uuidv4()} onClick={() => this.onClickRow(row, index)}>
        {finalRow}
      </tr>
    );
    return wrappedFinalRow;
  };
  onClickRow = (row, index) => {
    this.props.onRowClick(row, index);
  };
  filterRow = (row, index) => {
    let { filters } = this.state;
    let matchesFilters = filters
      .map(filter => {
        let rowValueStr = row[filter.id].toString();
        let filterValueStr = filter.value.toString();
        return rowValueStr.includes(filterValueStr);
      })
      .every(v => v === true);
    return matchesFilters;
  };

  paginationFilter = (row, index) => {
    let { pagination } = this.props;
    let { page, pageSize } = this.state;
    let rowInCurrentPage = true;
    if (pagination) {
      rowInCurrentPage =
        index >= page * pageSize && index < (page + 1) * pageSize;
    }
    return rowInCurrentPage;
  };

  colsAreValid = cols => {
    let colIds = cols.map(col => col.id);
    let uniqueColumns = new Set(colIds).size === colIds.length;
    return uniqueColumns;
  };
  handleFilterChange = (e, col) => {
    let { filtersMap } = this.state;
    let newVal = e.target.value;
    filtersMap[col.id] = newVal;
    let filtersListFromMap = Object.entries(filtersMap).map(v => ({
      id: v[0],
      value: v[1]
    }));
    this.setState({ filters: filtersListFromMap, filtersMap });
  };
  onClickPrevPage = () => {
    let { page } = this.state;
    if (page > 0) this.setState({ page: --page });
  };
  onClickNextPage = () => {
    let { page, pageSize } = this.state;
    let { pagination, rows } = this.props;
    if (page + 1 >= this.getPages()) return;
    if (pagination.type === "infinite") {
      this.setState({ pageSize: pageSize + (pagination.nextPageSize || 10) });
    } else {
      this.setState({ page: ++page });
    }
  };
  getCurrentRows = () => {
    return this.props.rows.filter(this.filterRow).filter(this.paginationFilter);
  };
  render() {
    let { columns, rows, filterable, pagination } = this.props;
    if (!this.colsAreValid(columns)) {
      console.error("error in Datatable: duplicate column ids");
      return "Duplicate col ids, check passed columns config";
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
                          onChange={e => this.handleFilterChange(e, col)}
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
            {this.getCurrentRows().map((row, index) => this.getRow(row, index))}
          </tbody>
        </table>
        {pagination ? (
          <div className="pagination">
            {pagination.type !== "infinite" ? (
              <React.Fragment>
                <button className="btn" onClick={this.onClickPrevPage}>
                  Previous
                </button>
                <input
                  type="text"
                  name="pageNo"
                  value={this.state.page + 1}
                  disabled
                />
              </React.Fragment>
            ) : (
              ""
            )}
            <button
              className="btn"
              onClick={this.onClickNextPage}
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
}

export default DataTable;


/*
refactoring:
- provider consumer
- separate scroll to bottom func
*/
