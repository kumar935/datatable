import React, { Component } from "react";
import uuidv4 from "uuid/v4";

class DataTable extends Component {
  state = {
    filters: [],
    filtersMap: {},
    page: 0,
    pageSize: 10
  };
  getRow = (row, index) => {
    let { columns } = this.props;
    let finalRow = columns.map(col => {
      let tdClass = "";
      if (col.numeric) tdClass += "numeric";

      if (col.Cell) {
        let { Cell } = col;
        return (
          <td>
            <Cell row={row} />
          </td>
        );
      }

      return (
        <td key={uuidv4()} className={tdClass}>
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
    let { filters, page, pageSize } = this.state;
    let { pagination } = this.props;

    let rowInCurrentPage = true;
    if (pagination) {
      rowInCurrentPage =
        index >= page * pageSize && index < (page + 1) * pageSize;
    }

    let filteringResult = filters
      .map(filter => {
        let rowValueStr = row[filter.id].toString();
        let filterValueStr = filter.value.toString();
        return rowValueStr.includes(filterValueStr);
      })
      .every(v => v === true);
    return filteringResult && rowInCurrentPage;
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
    let { pagination } = this.props;
    if (pagination.type === "infinite") {
      this.setState({ pageSize: pageSize + (pagination.nextPageSize || 10) });
    } else {
      this.setState({ page: ++page });
    }
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
            {rows
              .filter(this.filterRow)
              .map((row, index) => this.getRow(row, index))}
          </tbody>
        </table>
        {pagination ? (
          <div className="pagination">
            {(pagination || {}).type !== "infinite" ? (
              <button onClick={this.onClickPrevPage}>Previous</button>
            ) : (
              ""
            )}
            <button onClick={this.onClickNextPage}>Next</button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DataTable;

{
  /* <DataTable
  columns={[
    {
      id: "product", // Uniq ID to identify column
      label: "Product",
      numeric: false,
      width: "10px" | "10%" | "" | undefined
    },
    {
      id: "price",
      label: "Price",
      numeric: true // Right Align
    }
  ]}
  rows={[
    {
      id: some_id1,
      product: React.ReactNode | string | number, // Key is column id and value is
      price: 15.2
    },
    {
      id: some_id2,
      product: React.ReactNode | string | number,
      price: "$15.5"
    }
  ]}
  onRowClick={`(rowData: Object, rowIndex: number) => void`}
  onSelectionChange={`(string[] | 'All') => void`}
/>; */
}
