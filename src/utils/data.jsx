import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { convertDateTime } from "./helpers";

const handleClick = (e, id, handleDelModalOpen) => {
  e.stopPropagation();
  handleDelModalOpen(id);
};
const handleClickEdit = (e, data, handleModalOpen) => {
  e.stopPropagation();
  handleModalOpen(data);
};

export const getCategoryCol = (handleDelModalOpen, handleModalOpen) => {
  return [
    {
      name: "Category Name",
      selector: (row) => row.title, // Function-based selector
      sortable: true,
    },
    {
      name: "Created At",
      sortable: true,
      selector: (row) => convertDateTime(row.createdAt),
    },

    {
      name: "Action",
      sortable: false,
      cell: (d) => [
        <MdModeEdit
          key={d.title}
          onClick={(e) => handleClickEdit(e, d, handleModalOpen)}
          className="mr-2 cursor-pointer transition duration-50 transform hover:scale-150"
        ></MdModeEdit>,
        <MdDelete
          key={1}
          onClick={(e) => handleClick(e, d._id, handleDelModalOpen)}
          className="text-red-600 cursor-pointer transition duration-50 transform hover:scale-150"
        ></MdDelete>,
      ],
    },
  ];
};
export const getCarsCol = (handleDelModalOpen, handleModalOpen) => {
  return [
    {
      name: "Category",
      selector: (row) => row?.category?.title,
      sortable: true,
    },

    {
      name: "Color",
      selector: (row) => row?.color,
      sortable: true,
    },
    {
      name: "Maker",
      selector: (row) => row?.maker,
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row?.model,
      sortable: true,
    },
    {
      name: "Reg #",
      selector: (row) => row?.registrationNo,
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      cell: (d) => [
        <MdModeEdit
          key={d.title}
          onClick={(e) => handleClickEdit(e, d, handleModalOpen)}
          className="mr-2 cursor-pointer ransition duration-50 transform hover:scale-150"
        ></MdModeEdit>,
        <MdDelete
          key={1}
          onClick={(e) => handleClick(e, d._id, handleDelModalOpen)}
          className="text-red-600 cursor-pointer ransition duration-50 transform hover:scale-150"
        ></MdDelete>,
      ],
    },
  ];
};
