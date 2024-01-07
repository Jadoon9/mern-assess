/* eslint-disable react/prop-types */
import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import React, { Fragment } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";

const DropDown = ({ options, label, placeholder, drpName, isRequired }) => {
  const [field, meta] = useField(drpName);

  console.log(field, "adasdsad");

  return (
    <div className="w-full">
      <label htmlFor="" className="body-regular text-secondary-500">
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>

      <Listbox {...field}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button
                {...field}
                onChange={(value) => field.onChange(value)}
                onBlur={() => field.onBlur(drpName)}
                className={`w-full cursor-default appearance-none ${"primary-border-color"} rounded-[8px] h-[42px] py-2 pl-3 pr-10 text-left focus:outline-none`}
              >
                <span className="block truncate body-light">{placeholder}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaAngleDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Listbox.Options className="absolute mt-1 w-full py-2 z-50 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 h-48  overflow-scroll focus:outline-none sm:text-sm">
                  {options?.map?.((item, idx) => (
                    <Listbox.Option key={idx} value={item._id}>
                      {({ active, selected }) => (
                        <div
                          className={`${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          } cursor-pointer select-none relative px-4 py-2 flex  z-50 align-middle gap-3 items-start`}
                        >
                          {selected ? (
                            <span className="flex items-center">
                              <FaCheck
                                className="h-5 w-2 text-amber-600"
                                aria-hidden="true"
                              />
                            </span>
                          ) : (
                            <p className=" h-5 w-2 "></p>
                          )}
                          <p className="body-light flex-1 ">{item?.title}</p>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      {meta.touched && meta.error && (
        <p className="text-red-500 body-regular">{meta.error}</p>
      )}
    </div>
  );
};

export default DropDown;
