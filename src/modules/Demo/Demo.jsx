import React, { Component } from "react";
import DataTable from "../../utils/DataTable";
import { getDummyRows } from "./dummyRows";

class Demo extends Component {
  state = {
    selectedRowsMap: {},
    selectedRowIds: [],
    rows: []
  };
  componentDidMount() {
    this.fetchRows();
  }
  fetchRows = () => {
    this.setState({rows: getDummyRows(23)});
  }
  onRowClick = (row, i) => {
    console.log("logging row, i: ", row, i);
  };
  actionCell = ({row}) => {
    let { selectedRowsMap } = this.state;
    return (
      <input
        type="checkbox"
        checked={(selectedRowsMap[row.id])}
        onChange={e => {
          selectedRowsMap[row.id] = e.target.checked;
          this.setState({ selectedRowsMap });
          console.log("checkbox: ", row);
        }}
      />
    );
  };
  toggleSelectAll = e => {
    let {rows, selectedRowsMap} = this.state;
    this.datatable.getCurrentRows().map(row => {
      selectedRowsMap[row.id] = e.target.checked
    });
    this.setState({selectedRowsMap});
  }
  render() {
    return (
      <div className="demo-container">
        <DataTable
          onRef={ref => this.datatable = ref}
          filterable
          pagination={{
            type: "pages", // or infinite or pages by default,
            pageSize: 10,
            nextPageSize: 20,
            infiniteScrollBtn: true
          }}
          columns={[
            {
              id: "action",
              label: "Select",
              Header: <input type="checkbox" onChange={this.toggleSelectAll}/>,
              Cell: this.actionCell,
              filterable: false
            },
            {
              id: "srNo",
              label: "Sr No"
            },
            {
              id: "product", // Uniq ID to identify column
              label: "Product",
              width: "100px"
            },
            {
              id: "availability",
              label: "Availability"
            },
            {
              id: "category",
              label: "Category"
            },
            {
              id: "price",
              label: "Price",
              numeric: true // Right Align
            }
          ]}
          rows={this.state.rows}
          onRowClick={this.onRowClick}
          onSelectionChange={this.onSelectionChange}
        />
      </div>
    );
  }
}

export default Demo;
