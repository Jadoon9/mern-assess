/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import Input from "./Input";
import Button from "./Button";
import { categorySchema } from "../utils/validations";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../api/services/categoriesAction";
import { toast } from "react-toastify";

export default function CreateCategory({
  isOpen,
  handleOpen,
  refetch,
  editData,
}) {
  const [createCar, setCreateCar] = useState(false);
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

  useEffect(() => {
    if (isSuccess && createCar) {
      toast.success(data?.message);
      refetch();
      handleOpen();
    } else if (updateIsSuccess && !createCar) {
      toast.success(updateData?.message);
      refetch();
      handleOpen();
    }

    if (isError) {
      toast.error(error?.data?.message);
    } else if (updateIsError) {
      toast.error(updateError?.data?.message);
    }
  }, [isSuccess, isError, updateIsError, updateIsSuccess]);

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
                    className="text-lg font-medium leading-6 text-[#9f7aea]"
                  >
                    {editData?.title ? "Update" : "Add"} Category
                  </Dialog.Title>

                  <Formik
                    initialValues={{
                      catName: editData?.title || "",
                    }}
                    validationSchema={categorySchema}
                    onSubmit={(values) => {
                      if (editData?.title) {
                        const data = {
                          id: editData?._id,
                          title: values.catName,
                        };
                        setCreateCar(false);
                        updateCat(data);
                      } else {
                        setCreateCar(true);
                        createCat({ title: values.catName });
                      }
                    }}
                  >
                    {() => (
                      <Form>
                        <div className="flex flex-col gap-6 justify-center items-center mt-2">
                          <Input
                            label="Catrgory Name"
                            name="catName"
                            type="text"
                            placeholder="Enter Category Name"
                          />

                          <div className="w-1/2 ">
                            <Button
                              btnText={
                                editData?.title
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
}
