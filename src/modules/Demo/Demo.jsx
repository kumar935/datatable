import React, { Component } from "react";
import DataTable from "../../utils/DataTable";
let dummyRows = [
  {
    id: 1,
    product: "Pen", // Key is column id and value is,
    category: "stationary",
    availability: "AVAILABLE",
    price: 15.2
  },
  {
    id: 2,
    product: "apple",
    category: "fruit",
    availability: "OUT OF STOCK",
    price: "$15.5"
  },
  {
    id: 3,
    product: "pineapple", // Key is column id and value is
    category: "fruit",
    availability: "AVAILABLE",
    price: 315.2
  },
  {
    id: 4,
    product: "Galaxy s9",
    category: "electronic",
    availability: "AVAILABLE",
    price: "22215.5"
  }
];
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
    this.setState({rows: dummyRows});
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
