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

  console.log(setPage);
  const handleModalOpen = (data) => {
    setIsOpen(!isOpen);
    if (data) {
      setEditData(data);
    }
  };
  const handleDelModalOpen = (id) => {
    setIsDeleteOpen(!isDeleteOpen);
    console.log(id, "hjkjh");
    if (id) {
      setDeleteId(id);
    }
  };

  if (isLoading) {
    <Loader />;
  }
  console.log(editData, "0909");

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
      <div className="flex-between">
        <h1 className="h1-bold mb-2 text-[#9f7aea]">Categories</h1>
        <div className="w-[200px]">
          <Button btnText="Add Category" onClick={handleModalOpen} />
        </div>
      </div>
      <DataTable
        data={data?.data?.categories}
        columns={getColumnsData(handleDelModalOpen, handleModalOpen)}
        pending={false}
        loading={isLoading}
        totalRows={data?.data?.count}
        setPage={setPage}
      />
    </div>
  );
};

export default Categories;
