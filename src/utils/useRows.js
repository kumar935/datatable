import React, { useState, useEffect, useRef } from "react";

export default function useRows({ filters, page, pageSize, pagination, rows }) {

  function filterRow(row, index) {
    let matchesFilters = filters
      .map(filter => {
        let rowValueStr = row[filter.id].toString();
        let filterValueStr = filter.value.toString();
        return rowValueStr.includes(filterValueStr);
      })
      .every(v => v === true);
    return matchesFilters;
  }

  function paginationFilter(row, index) {
    let rowInCurrentPage = true;
    if (pagination) {
      rowInCurrentPage =
        index >= page * pageSize && index < (page + 1) * pageSize;
    }
    return rowInCurrentPage;
  }

  let visibleRows = rows.filter(filterRow).filter(paginationFilter)


  return [visibleRows];
}
