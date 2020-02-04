import { act } from 'react-dom/test-utils';
import useRows from '../src/utils/useRows';
import { testHook } from '../config/testHook';

let filterTestRows;
let paginationTestRows;
beforeEach(() => {
  testHook(() => {
    filterTestRows = useRows({
      filters: [{id: "someCol", value: "a"}],
      page: 0,
      pageSize: 10,
      pagination: {},
      rows: [{someCol: "a"}, {someCol: "b"}]
    });
    paginationTestRows = useRows({
      filters: [],
      page: 1,
      pageSize: 2,
      pagination: {},
      rows: [{someCol: "a"}, {someCol: "b"}, {someCol: "a"}]
    });
  });
});

describe('useRows', () => {
  test('filterRow fn', () => {
    expect(filterTestRows[0].length).toBe(1);
  });
  test('testing pagination', () => {
    expect(paginationTestRows[0].length).toBe(1);
  });
});
