import React, { useState, useEffect, useRef } from "react";

export default function useRows({ manual, filters, page, pageSize, pagination, rows }) {
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
      if(pagination.type === "infinite"){
        rowInCurrentPage = (index >= page) && (index < (page + pageSize));
      } else {
        rowInCurrentPage = index >= page * pageSize && index < (page + 1) * pageSize;
      }
    }
    return rowInCurrentPage;
  }

  if(manual === true) return [rows];
  let visibleRows = rows.filter(filterRow).filter(paginationFilter);

  return [visibleRows];
}
