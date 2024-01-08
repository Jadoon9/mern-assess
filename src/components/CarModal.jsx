/* eslint-disable react/prop-types */
import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import Input from "./Input";
import Button from "./Button";
import DropDown from "./Dropdown";
import { carSchema } from "../utils/validations";
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from "../redux/services/Car";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../redux/services/Category";

const CarModal = ({ isOpen, handleOpen, editData, refetch }) => {
  const { data: catData } = useGetCategoriesQuery(
    { page: 1, limit: 100 },
    {
      refetchOnMountOrArgChange: true,
      skip: !isOpen,
    }
  );
  const [createCar, { isSuccess, isError, error, data }] =
    useCreateCarMutation();
  const [
    updateCar,
    {
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
      data: updateData,
    },
  ] = useUpdateCarMutation();

  const handleMutationSuccess = (successMessage) => {
    toast.success(successMessage);
    refetch();
    handleOpen();
  };

  const handleMutationError = (errorMessage) => {
    toast.error(errorMessage);
  };

  useEffect(() => {
    if (isSuccess && data) {
      handleMutationSuccess(data?.message);
    }
    if (isError) {
      handleMutationError(error?.data?.message);
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (updateIsSuccess && updateData) {
      handleMutationSuccess(updateData?.message);
    }
    if (updateIsError) {
      handleMutationError(updateError?.data?.message);
    }
  }, [updateIsError, updateIsSuccess, updateData]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-primary-500"
                  >
                    {editData?._id ? "Edit Car" : "Add Car"}
                  </Dialog.Title>

                  <Formik
                    initialValues={{
                      category: editData?.category?._id || "",
                      color: editData?.color || "",
                      model: editData?.model || "",
                      maker: editData?.maker || "",
                      registrationNo: editData?.registrationNo || "",
                    }}
                    validationSchema={carSchema}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      const data = {
                        color: values?.color,
                        model: values?.model,
                        maker: values?.maker,
                        registrationNo: values?.registrationNo,
                        category: values?.category,
                      };
                      if (editData?._id) {
                        const updatedData = { data: data, id: editData?._id };
                        updateCar(updatedData);
                      } else {
                        createCar(data);
                      }
                    }}
                  >
                    {() => (
                      <Form>
                        <div className="flex flex-col gap-6 justify-center items-center mt-2">
                          <DropDown
                            options={catData?.data?.categories || []}
                            placeholder="Select Category"
                            label="Category"
                            name="category"
                          />
                          <Input
                            label="Car Color"
                            name="color"
                            type="text"
                            placeholder="Enter Car Color"
                          />
                          <Input
                            label="Car Maker"
                            name="maker"
                            type="text"
                            placeholder="Enter Car Maker"
                          />
                          <Input
                            label="Car Model"
                            name="model"
                            type="text"
                            placeholder="Enter Car Model"
                          />
                          <Input
                            label="Reg #"
                            name="registrationNo"
                            type="text"
                            placeholder="Enter Regesteration Number"
                          />

                          <div className="w-1/2 ">
                            <Button
                              type="submit"
                              btnText={
                                editData?._id ? "Update Car" : "Create Car"
                              }
                            />
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarModal;
