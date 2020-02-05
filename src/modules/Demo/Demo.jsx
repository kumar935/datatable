import React, { Component } from "react";
import DataTable from "../../utils/DataTable.func";
import { getDummyRows } from "./dummyRows";

class Demo extends Component {
  state = {
    loading: true,
    selectedRowsMap: {},
    selectedRowIds: [],
    rows: [],
    selectAllChecked: false,
    paginationType: "infinite",
    showInfScrollBtn: false,
    filterable: true,
    pageSize: 20,
    nextPageSize: 20,
    maxRows: 100,
    pageSizeFinal: 20,
    nextPageSizeFinal: 20,
    maxRowsFinal: 100
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
        this.setState({ rows, loading: false });
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

  toggleSelectAll = ({ checked, visibleRows }) => {
    let { selectedRowsMap } = this.state;
    visibleRows.map(row => {
      selectedRowsMap[row.id] = checked;
    });
    this.setState({ selectedRowsMap, selectAllChecked: checked });
  };
  onChangeDataTable = ({ selectAllChecked, visibleRows }) => {
    this.toggleSelectAll({ checked: selectAllChecked, visibleRows });
  };
  render() {
    let {
      paginationType,
      filterable,
      showInfScrollBtn,
      pageSize,
      nextPageSize,
      maxRows,
      pageSizeFinal,
      nextPageSizeFinal,
      maxRowsFinal

    } = this.state;
    return (
      <div className="demo-container">
        <div className="opts-container">
          <select
            name="type"
            value={paginationType}
            onChange={e => this.setState({ paginationType: e.target.value })}
          >
            <option value="pages">pages</option>
            <option value="infinite">infinite</option>
          </select>
          {paginationType === "infinite" ? (
            <React.Fragment>
              <label htmlFor="show-btn-opt">
                Show Load more Button:
                <input
                  type="checkbox"
                  checked={showInfScrollBtn}
                  id="show-btn-opt"
                  onChange={e =>
                    this.setState({ showInfScrollBtn: e.target.checked })
                  }
                />
              </label>
              <label htmlFor="nextPageSize">
                Next Page Size:
                <input
                  type="text"
                  id="nextPageSize"
                  value={this.state.nextPageSize}
                  onChange={e =>
                    this.setState({ nextPageSize: e.target.value })
                  }
                  onBlur={() => {
                    this.setState({nextPageSizeFinal: Number(this.state.nextPageSize)})
                  }}
                />
              </label>
              <label htmlFor="maxRows">
                Max Rows:
                <input
                  type="text"
                  id="maxRows"
                  value={this.state.maxRows}
                  onChange={e => this.setState({ maxRows: e.target.value })}
                  onBlur={() => {
                    this.setState({maxRowsFinal: Number(this.state.maxRows)})
                  }}
                />
              </label>
            </React.Fragment>
          ) : (
            <label htmlFor="nextPageSize">
              Page Size:
              <input
                type="text"
                id="nextPageSize"
                value={this.state.pageSize}
                onChange={e => this.setState({ pageSize: e.target.value })}
                onBlur={() => {
                  this.setState({pageSizeFinal: Number(this.state.pageSize)})
                }}
              />
            </label>
          )}
          <label htmlFor="filterable-opt">
            filterable:
            <input
              type="checkbox"
              checked={filterable}
              id="filterable-opt"
              onChange={e => this.setState({ filterable: e.target.checked })}
            />
          </label>
        </div>
        <br/>
        <div className="opts-note">(Above text input changes will reflect on focus out)</div>
        <DataTable
          onRef={ref => (this.datatable = ref)} // this only works for class component implementation
          filterable={filterable}
          pagination={{
            type: paginationType, // or infinite or pages by default,
            pageSize: pageSizeFinal,
            nextPageSize: nextPageSizeFinal,
            infiniteScrollBtn: showInfScrollBtn,
            maxRows: maxRowsFinal
          }}
          columns={[
            {
              id: "action",
              label: "Select",
              Header: ({ onChange }) => {
                return (
                  <input
                    type="checkbox"
                    onChange={e =>
                      onChange({ selectAllChecked: e.target.checked })
                    }
                    checked={this.state.selectAllChecked}
                  />
                );
              },
              Cell: this.actionCell,
              filterable: false,
              width: "20px"
            },
            {
              label: "Id",
              id: "id",
              filterable: false,
              numeric: true,
              width: "100px"
            },
            {
              id: "albumId",
              label: "Album Id",
              numeric: true,
              width: "60px"
            },
            {
              id: "title",
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
          onChange={this.onChangeDataTable}
        />
        <h5 style={{textAlign: "center"}}>
          {this.state.loading ? "Loading..." : ""}
        </h5>

      </div>
    );
  }
}

export default Demo;
