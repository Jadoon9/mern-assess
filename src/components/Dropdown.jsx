/* eslint-disable react/prop-types */
import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import React, { Fragment } from "react";

const DropDown = ({ options, label, placeholder, name }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption) => {
    helpers.setValue(selectedOption);
  };

  return (
    <div className="w-full">
      <label className="body-regular text-[#4F4F4F]">{label}</label>

      <Listbox
        value={field.value}
        onChange={(selectedOption) => handleChange(selectedOption)}
      >
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button
                className={`w-full cursor-default appearance-none primary-border-color rounded-[8px] h-[42px] py-2 pl-3 pr-10 text-left focus:outline-none`}
              >
                <span className="block truncate body-light">
                  {field.value || placeholder}
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
                <Listbox.Options className="absolute mt-1 w-full py-2 z-30 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 h-48  overflow-scroll focus:outline-none sm:text-sm">
                  {options.map((item, idx) => (
                    <Listbox.Option key={idx} value={item?._id}>
                      {({ active }) => (
                        <div
                          className={`${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          } cursor-pointer select-none relative px-4 py-2 flex  z-50 align-middle gap-3 items-start`}
                        >
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
