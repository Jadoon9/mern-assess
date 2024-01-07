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
} from "../api/services/carAction";
import { toast } from "react-toastify";

export default function CreateCarModal({
  isOpen,
  handleOpen,
  editData,
  refetch,
  catData,
}) {
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

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      refetch();
      handleOpen();
    } else if (updateIsSuccess) {
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
                    Add Car
                  </Dialog.Title>

                  <Formik
                    initialValues={{
                      catName: editData?.title || "",
                      // carName: editData?.carName || "",
                      color: editData?.color || "",
                      model: editData?.model || "",
                      maker: editData?.maker || "",
                      regNumb: editData?.registrationNo || "",
                    }}
                    validationSchema={carSchema}
                    onSubmit={(values) => {
                      const data = {
                        color: values?.color,
                        model: values?.model,
                        maker: values?.maker,
                        registrationNo: values?.regNumb,
                        category: values?.catName,
                      };
                      if (editData?.title) {
                        updateCar(data);
                      } else {
                        createCar(data);
                      }
                    }}
                  >
                    {() => (
                      <Form>
                        <div className="flex flex-col gap-6 justify-center items-center mt-2">
                          {/* <Input
                            label="Car Name"
                            name="carName"
                            type="text"
                            placeholder="Enter Car Name"
                          /> */}
                          <DropDown
                            options={catData?.data?.categories || []}
                            drpName="catName"
                            placeholder="Select Category"
                            label="Category"
                            name="catName"
                            isRequired
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
                            label="Car Name"
                            name="regNumb"
                            type="text"
                            placeholder="Enter Regesteration Number"
                          />

                          <div className="w-1/2 ">
                            <Button type="submit" btnText="Create Car" />
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