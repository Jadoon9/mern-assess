/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import CustomLoader from "./CustomLoader";
import Loader from "./Loader";

const DataTablee = ({ data, columns, page, isLoading, totalRows, setPage }) => {
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (pageCount) => {
    console.log(pageCount, "asdas3");
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
