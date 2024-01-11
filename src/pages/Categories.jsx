import React, { useState } from "react";
import Button from "../components/Button.jsx";
import DataTable from "../components/DataTable.jsx";
import { getCategoryCol } from "../utils/data.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import CategoryModal from "../components/CategoryModal.jsx";
// import { useGetCategoriesQuery } from "../redux/services/Category";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../reactQueryPractice/categoryActions/index.js";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState("");
  const [page, setPage] = useState(1);

  const { isPending, data } = useQuery({
    queryKey: ["categories", { page }],
    queryFn: (page) => getAllCategories(page),
  });

  const handleModalOpen = (data) => {
    setIsOpen(!isOpen);
    setEditData(data);
  };
  const handleDelModalOpen = (id) => {
    setIsDeleteOpen(!isDeleteOpen);
    setDeleteId(id);
  };

  return (
    <div className="px-40">
      <div className="flex-between my-6">
        <h1 className="h1-bold mb-2 text-primary-500">Categories</h1>
        <h2 className="h1-bold mb-2 text-gray-400">
          Numbers of Added Categories : {data?.data?.count || 0}
        </h2>
        <div className="w-[200px]">
          <Button btnText="Add Category" onClick={handleModalOpen} />
        </div>
      </div>
      <DataTable
        data={data?.data?.categories || []}
        columns={getCategoryCol(handleDelModalOpen, handleModalOpen)}
        totalRows={data?.data?.count}
        setPage={setPage}
        isLoading={isPending}
        // isLoading={isPending || isFetching}
      />

      <CategoryModal
        isOpen={isOpen}
        handleOpen={handleModalOpen}
        editData={editData}
        // refetch={refetch}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        handleOpen={handleDelModalOpen}
        id={deleteId}
        // refetch={refetch}
      />
    </div>
  );
};

export default Categories;
