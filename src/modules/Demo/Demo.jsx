import React, { Component } from "react";
import DataTable from "../../utils/DataTable";

class Demo extends Component {
  state = {};
  onRowClick = (row,i) => {
    console.log('logging row, i: ', row, i);
  }
  render() {
    return (
      <div className="demo-container">
        <DataTable
          columns={[
            {
              id: "product", // Uniq ID to identify column
              label: "Product",
              numeric: false,
              width: "100px"
            },
            {
              id: "price",
              label: "Price",
              numeric: true // Right Align
            }
          ]}
          rows={[
            {
              id: 1,
              product: "xyz", // Key is column id and value is
              price: 15.2
            },
            {
              id: 2,
              product: "xyz",
              price: "$15.5"
            },
            {
              id: 3,
              product: "xyz", // Key is column id and value is
              price: 315.2
            },
            {
              id: 4,
              product: "xyz",
              price: "22215.5"
            }
          ]}
          onRowClick={this.onRowClick}
          onSelectionChange={this.onSelectionChange}
        />
      </div>
    );
  }
}

export default Demo;
