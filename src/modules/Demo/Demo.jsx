import React, { Component } from "react";
import DataTable from "../../utils/DataTable.func";
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
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        return response.json();
      })
      .then(rows => {
        this.setState({ rows });
      });

    // this.setState({ rows: getDummyRows(1000) });
  };
  onRowClick = (row, i) => {
    console.log("logging row, i: ", row, i);
  };
  actionCell = ({ row }) => {
    let { selectedRowsMap } = this.state;
    return (
      <input
        type="checkbox"
        checked={selectedRowsMap[row.id]}
        onChange={e => {
          selectedRowsMap[row.id] = e.target.checked;
          this.setState({ selectedRowsMap });
          console.log("checkbox: ", row);
        }}
      />
    );
  };

  imageCell = ({ row }) => {
    return (
      <a href={row.url} className="tooltip" target="_blank">
        Image
        <span>
          <img src={row.url} />
        </span>
      </a>
    );
  };

  thumbnailCell = ({ row }) => {
    return (
      <a href={row.thumbnailUrl} className="tooltip" target="_blank">
        Thumbnail
        <span>
          <img src={row.thumbnailUrl} alt="" />
        </span>
      </a>
    );
  };

  toggleSelectAll = e => {
    let { rows, selectedRowsMap } = this.state;
    this.datatable.getCurrentRows().map(row => {
      selectedRowsMap[row.id] = e.target.checked;
    });
    this.setState({ selectedRowsMap });
  };
  render() {
    return (
      <div className="demo-container">
        <DataTable
          onRef={ref => (this.datatable = ref)}
          filterable
          pagination={{
            type: "infinite", // or infinite or pages by default,
            pageSize: 24,
            nextPageSize: 20,
            infiniteScrollBtn: false
          }}
          columns={[
            {
              id: "action",
              label: "Select",
              Header: <input type="checkbox" onChange={this.toggleSelectAll} />,
              Cell: this.actionCell,
              filterable: false,
              width: "20px"
            },
            {
              id: "albumId",
              label: "Album Id",
              width: "60px"
            },
            {
              id: "title", // Uniq ID to identify column
              label: "title",
              width: "32%",
              longtext: true
            },
            {
              id: "url",
              label: "Image",
              Cell: this.imageCell,
              filterable: false
            },
            {
              id: "thumbnailUrl",
              label: "Thumbnail",
              Cell: this.thumbnailCell,
              filterable: false
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
