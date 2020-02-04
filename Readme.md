## DataTable

[Live Demo](https://animesh.firebaseapp.com/)

Configurable React based utility to render tables

## Setup

- `yarn`
- For development: `yarn dev`
- For build: `yarn run build`
- For testing: `yarn run test`

## Deployment

 - included deploy.sh script which tests, builds then deploys to host.


## Component Options

#### Available options:

- filterable: allows filtering columns
- pagination:
  - type: `infinite` or `pages`
  - pageSize
  - nextPageSize (for type `infinite`)
  - infiniteScrollBtn (for type `infinite`)
  - maxRows (for type `infinite`)
- columns:
  - id
  - numeric (right aligns numeric)
  - longtext (adds ellipsis and on hover full text)
  - width
  - label
  - Header
  - Cell (custom Cell with onChange callback from which table data can be passed)
  - filterable
- rows
- onRowClick
- onChange

#### Usage:

```javascript

<DataTable
  onRef={ref => (this.datatable = ref)} // only works for the class based implementation
  filterable
  pagination={{
    type: "infinite", // ("infinite", "pages")
    pageSize: 20,
    //options below only applicable for type: "infinite"
    nextPageSize: 20,
    infiniteScrollBtn: false,
    maxRows: 60
  }}
  columns={[
    {
      id: "action",
      label: "Select",
      Header: ({ onChange }) => {
        return (
          <input
            type="checkbox"
            onChange={e => onChange({selectAllChecked: e.target.checked})}
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
      width: "100px"
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
      Cell: ({ row }) => <img src={row.url}>,
      filterable: false
    },
    {
      id: "thumbnailUrl",
      label: "Thumbnail",
      Cell: ({ row }) => <img src={row.thumbnailUrl}>,
      filterable: false
    }
  ]}
  rows={this.state.rows}
  onRowClick={this.onRowClick}
  onChange={this.onChangeDataTable}
/>

```

## More info

- Initially started with the class component for DataTable, then switched to functional component using custom hooks. Class implementation also there in code.
- Infinite Scroll can load data infinitely as previous rows are unloaded being restricted by the `pagination.maxRows` parameter
- Large No of rows can be handled as only the rows visible are loaded on DOM
- Fetch API is used to load the data from the rest endpoint

## Test cases

- Have included the setup for doing snapshot testing and custom hooks testing using jest and enzyme.
- Only a few test cases as of now.
