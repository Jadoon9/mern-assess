/* eslint-disable react/prop-types */
import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import Input from "./Input";
import Button from "./Button";
import { categorySchema } from "../utils/validations";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../redux/services/Category";
import { toast } from "react-toastify";

const CategoryModal = ({ isOpen, handleOpen, refetch, editData }) => {
  const [createCat, { isSuccess, isError, error, data }] =
    useCreateCategoryMutation();
  const [
    updateCat,
    {
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
      data: updateData,
    },
  ] = useUpdateCategoryMutation();

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
                    {editData?._id ? "Update" : "Add"} Category
                  </Dialog.Title>

                  <Formik
                    initialValues={{
                      title: editData?.title || "",
                    }}
                    validationSchema={categorySchema}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      let data = { title: values.title };
                      if (editData?.title) {
                        data["id"] = editData?._id;
                        updateCat(data);
                      } else {
                        createCat(data);
                      }
                    }}
                  >
                    {() => (
                      <Form>
                        <div className="flex flex-col gap-6 justify-center items-center mt-2">
                          <Input
                            label="Catrgory Name"
                            name="title"
                            type="text"
                            placeholder="Enter Category Name"
                          />

                          <div className="w-1/2 ">
                            <Button
                              btnText={
                                editData?._id
                                  ? "Update Category"
                                  : "Add Category"
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

export default CategoryModal;
