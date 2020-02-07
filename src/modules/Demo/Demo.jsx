import React, { Component } from "react";
import DataTable from "../../utils/DataTable.func";
import { getDummyRows } from "./dummyRows";
import { debounce } from "../../utils/utils";

class Demo extends Component {
  state = {
    loading: true,
    selectedRowsMap: {},
    selectedRowIds: [],
    rows: [],
    selectAllChecked: false,
    paginationType: "infinite",
    showInfScrollBtn: false,
    manual: true,
    filterable: true,
    pageSize: 20,
    nextPageSize: 20,
    maxRows: 100,
    pageSizeFinal: 20,
    nextPageSizeFinal: 20,
    maxRowsFinal: 100
  };
  componentDidMount() {
    if(!this.state.manual) this.fetchRows();
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

  serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  fetchData = debounce((data) => {
    console.log('logging data: ', data);
    let {page, pageSize, filters} = data;
    this.setState({ loading: true });
    let baseUrl = `https://jsonplaceholder.typicode.com/photos`;
    let filtersQuery = {};
    filters.filter(f => !!f.value).map(f => {
      filtersQuery[f.id] = f.value;
    })
    let reqObj = {
      ...this.state.paginationType === "infinite" ? {
        _start: page
      } : {
        _page: page
      },
      _limit: pageSize,
      ...filtersQuery
    }
    let fullUrl = `${baseUrl}?${this.serialize(reqObj)}`;
    fetch(fullUrl)
      .then(response => {
        return response.json();
      })
      .then(rows => {
        this.setState({ rows, loading: false });
      })
      .catch((error) => {
        console.error('error in fetchData: ', error);
      })
  },200)
  render() {
    let {
      paginationType,
      manual,
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
          manual={manual}
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
          onFetchData={this.fetchData}
          onChange={this.onChangeDataTable}
        />
        {this.state.loading ? (
          <h5 style={{textAlign: "center", marginBottom: 250}}>Loading...</h5>
        ) : ''}

      </div>
    );
  }
}

export default Demo;
