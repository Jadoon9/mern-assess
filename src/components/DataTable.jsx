import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import CustomLoader from "./CustomLoader";

const DataTablee = ({ data, columns, pending }) => {
  const tableData = {
    columns,
    data,
  };

  return (
    <div className="main">
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortAsc={true}
          pagination
          highlightOnHover
          dense
          progressPending={pending}
          progressComponent={<CustomLoader />}
        />
      </DataTableExtensions>
    </div>
  );
};

export default DataTablee;
