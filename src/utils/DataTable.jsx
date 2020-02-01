import React, { Component } from "react";

class DataTable extends Component {
  state = {};
  getRow = (row, index) => {
    let { columns } = this.props;
    let finalRow = columns.map(col => {
      let tdClass = "";
      if(col.numeric) tdClass += "numeric";
      return <td className={tdClass}>{row[col.id]}</td>;
    });
    let wrappedFinalRow = <tr onClick={() => this.onClickRow(row, index)}>{finalRow}</tr>;
    return wrappedFinalRow;
  };
  onClickRow = (row,index) => {
    this.props.onRowClick(row, index)
  }
  render() {
    let { columns, rows } = this.props;
    return (
      <table class="datatable">
        <thead className="col-headers">
          {columns.map(col => (
            <th style={{width: col.width || "auto"}}>{col.label}</th>
          ))}
        </thead>
        <tbody className="rows">{rows.map((row,index) => this.getRow(row,index))}</tbody>
      </table>
    );
  }
}

export default DataTable;


{/* <DataTable
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
/>; */}
