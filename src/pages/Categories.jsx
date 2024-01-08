import React, { useState } from "react";
import Button from "../components/Button.jsx";
import DataTable from "../components/DataTable.jsx";
import Navbar from "../components/Navbar.jsx";
import { getColumnsData } from "../utils/data.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import CreateCategory from "../components/CreateategoryModel.jsx";
import { useGetCategoriesQuery } from "../api/services/categoriesAction.js";
import Loader from "../components/Loader.jsx";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [editData, setEditData] = useState();
  const [page, setPage] = useState(1);

  const { isLoading, refetch, data } = useGetCategoriesQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleModalOpen = (data) => {
    setIsOpen(!isOpen);
    if (data) {
      setEditData(data);
    }
  };
  const handleDelModalOpen = (id) => {
    setIsDeleteOpen(!isDeleteOpen);
    if (id) {
      setDeleteId(id);
    }
  };

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="px-40">
      <CreateCategory
        isOpen={isOpen}
        handleOpen={handleModalOpen}
        editData={editData}
        refetch={refetch}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        handleOpen={handleDelModalOpen}
        id={deleteId}
        refetch={refetch}
      />
      <Navbar />
      <div className="flex-between my-6">
        <h1 className="h1-bold mb-2 text-[#9f7aea]">Categories</h1>
        <h2 className="h1-bold mb-2 text-gray-400">
          Number of Added Categories : {data?.data?.count}
        </h2>
        <div className="w-[200px]">
          <Button btnText="Add Category" onClick={handleModalOpen} />
        </div>
      </div>
      <DataTable
        data={data?.data?.categories}
        columns={getColumnsData(handleDelModalOpen, handleModalOpen)}
        loading={isLoading}
        totalRows={data?.data?.count}
        setPage={setPage}
      />
    </div>
  );
};

export default Categories;
