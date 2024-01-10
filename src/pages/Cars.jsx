import React, { useState } from "react";
import Button from "../components/Button.jsx";
import DataTable from "../components/DataTable.jsx";
import { getCarsCol } from "../utils/data.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
// import { useGetCarsQuery } from "../redux/services/Car";
import CarModal from "../components/CarModal.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllCars } from "../reactQueryPractice/carActions/index.js";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);

  const { isPending, data } = useQuery({
    queryKey: ["cas", page],
    queryFn: (page) => getAllCars(page),
  });

  // const { isLoading, isFetching, refetch, data } = useGetCarsQuery(
  //   { page },
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );
  console.log(data, "checkdata");

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
        <h1 className="h1-bold mb-2 text-primary-500">Cars</h1>
        <div>
          <h2 className="h1-bold mb-2 text-gray-400">
            Number of Registered Cars : {data?.data?.count || 0}
          </h2>
        </div>
        <div className="w-[200px]">
          <Button btnText="Add Cars" onClick={handleModalOpen} />
        </div>
      </div>
      <DataTable
        data={data?.data?.cars || []}
        columns={getCarsCol(handleDelModalOpen, handleModalOpen)}
        totalRows={data?.data?.count}
        setPage={setPage}
        isLoading={isPending}
      />

      <CarModal
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
        myKey={true}
      />
    </div>
  );
};

export default Tasks;
