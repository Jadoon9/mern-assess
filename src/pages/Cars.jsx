import React, { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import DataTable from "../components/DataTable.jsx";
import Navbar from "../components/Navbar.jsx";
import { getCarsData } from "../utils/data.jsx";
import DeleteModal from "../components/DeleteModal.jsx";

import { useGetCarsQuery } from "../api/services/carAction.js";
import Loader from "../components/Loader.jsx";
import CreateCarModal from "../components/CreateCarModal.jsx";
import { useGetCategoriesQuery } from "../api/services/categoriesAction.js";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);

  const { data: catData } = useGetCategoriesQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { isLoading, refetch, data } = useGetCarsQuery(
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

  useEffect(() => {
    refetch();
  }, [page]);

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="px-40">
      <CreateCarModal
        isOpen={isOpen}
        handleOpen={handleModalOpen}
        editData={editData}
        catData={catData}
        refetch={refetch}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        handleOpen={handleDelModalOpen}
        id={deleteId}
      />
      <Navbar />
      <div className="flex-between my-6">
        <h1 className="h1-bold mb-2 text-[#9f7aea]">Cars</h1>
        <div>
          <h2 className="h1-bold mb-2 text-gray-400">
            Number of Registered Cars : {data?.data?.count}
          </h2>
        </div>
        <div className="w-[200px]">
          <Button btnText="Add Cars" onClick={handleModalOpen} />
        </div>
      </div>

      <DataTable
        data={data?.data?.cars || []}
        columns={getCarsData(handleDelModalOpen, handleModalOpen)}
        loading={isLoading}
        totalRows={data?.data?.count}
        setPage={setPage}
      />
    </div>
  );
};

export default Tasks;
