import React, { Component } from "react";
import DataTable from "../../utils/DataTable";
import { dummyRows, getDummyRows } from "./dummyRows";

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
    this.setState({rows: getDummyRows(1000)});
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
    rows.map(row => {
      selectedRowsMap[row.id] = e.target.checked
    });
    this.setState({selectedRowsMap});
  }
  render() {
    return (
      <div className="demo-container">
        <DataTable
          filterable
          columns={[
            {
              id: "action",
              label: "Action",
              Header: <input type="checkbox" onChange={this.toggleSelectAll}/>,
              Cell: this.actionCell,
              filterable: false
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
