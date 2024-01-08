/* eslint-disable react/prop-types */
import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import { useDeleteCategoriesMutation } from "../redux/services/Category";
import { toast } from "react-toastify";
import { useDeleteCarMutation } from "../redux/services/Car";

export default function DeleteModal({
  isOpen,
  handleOpen,
  id,
  refetch,
  myKey = false,
}) {
  const [deleteCat, { isSuccess, isError, error, data }] =
    useDeleteCategoriesMutation();
  const [
    deleteCar,
    {
      isSuccess: delIsSuccess,
      isError: delIsError,
      error: delError,
      data: delData,
    },
  ] = useDeleteCarMutation();

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
    if (delIsSuccess && delData) {
      handleMutationSuccess(delData?.message);
    }
    if (delIsError) {
      handleMutationError(delError?.data?.message);
    }
  }, [delIsSuccess, delIsError, delData]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleOpen}>
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
                    className="text-lg font-medium leading-6 text-gray-900 mb-10"
                  >
                    Are you sure you want to delete?
                  </Dialog.Title>
                  <div className="flex justify-between gap-4">
                    <Button btnText="Cancel" onClick={handleOpen} />
                    <Button
                      btnText="Delete"
                      className="bg-rose-700 text-white"
                      nobg
                      onClick={() => {
                        if (myKey) {
                          deleteCar(id);
                        } else {
                          deleteCat(id);
                        }
                      }}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
