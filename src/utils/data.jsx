import { MdModeEdit, MdDelete } from "react-icons/md";
import React from "react";
import { convertUtcToLocalTime } from "./helpers";

const handleClick = (e, id, handleDelModalOpen) => {
  e.stopPropagation();
  handleDelModalOpen(id);
};
const handleClickEdit = (e, data, handleModalOpen) => {
  e.stopPropagation();
  handleModalOpen(data);
};

export const getColumnsData = (handleDelModalOpen, handleModalOpen) => {
  return [
    {
      name: "Category Name",
      selector: "title",
      sortable: true,
    },
    {
      name: "Created At",
      selector: "createdAt",
      sortable: true,
      cell: (row) => convertUtcToLocalTime(row.createdAt),
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
export const getCarsData = (handleDelModalOpen, handleModalOpen) => {
  return [
    {
      name: "Category",
      selector: "caregory",
      sortable: true,
      cell: (row) => {
        return row?.category?.title;
      },
    },

    {
      name: "Color",
      selector: "color",
      sortable: true,
    },
    {
      name: "Maker",
      selector: "maker",
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Regesteration #",
      selector: "registrationNo",
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
