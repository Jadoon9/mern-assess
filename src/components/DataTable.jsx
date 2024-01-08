/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

import Loader from "./Loader";

const DataTablee = ({ data, columns, page, isLoading, totalRows, setPage }) => {
  const handlePageChange = (pageCount) => {
    setPage(pageCount);
  };

  return (
    <div className="main">
      <DataTable
        columns={columns}
        data={data}
        progressPending={isLoading}
        progressComponent={<Loader />}
        pagination
        paginationServer
        paginationRowsPerPageOptions={[]}
        paginationTotalRows={totalRows}
        paginationDefaultPage={page}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default DataTablee;
