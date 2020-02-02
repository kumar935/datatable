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
          filterable
          columns={[
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
          rows={[
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
          ]}
          onRowClick={this.onRowClick}
          onSelectionChange={this.onSelectionChange}
        />
      </div>
    );
  }
}

export default Demo;
