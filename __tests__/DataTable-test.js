// __tests__/CheckboxWithLabel-test.js
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import DataTable from "../src/utils/DataTable";
import {shallow} from 'enzyme';
import { getDummyRows } from "../src/modules/Demo/dummyRows";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("Testing Datatable functions", () => {
  const datatable = shallow(
    <DataTable
      filterable
      pagination={{
        type: "pages", // or infinite or pages by default,
        pageSize: 10,
        nextPageSize: 20
      }}
      columns={[
        {
          id: "action",
          label: "Action",
          filterable: false
        },
        {
          id: "srNo",
          label: "srNo"
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
      rows={getDummyRows(1000)}
    />
  );

  expect(datatable.instance().getCurrentRows().length).toBe(10);
});
