/* eslint-disable react/prop-types */
import React from "react";
import { useField } from "formik";

const Input = ({
  type,
  placeholder,
  label,
  name,
  valueHandler,
  isRequired,
}) => {
  const [field, meta] = useField(name);
  const handleChange = (e) => {
    field.onChange(e); // Update the formik field value
    valueHandler && valueHandler(e.target.name, e.target.value);
  };
  return (
    <div className="w-full">
      <label htmlFor="" className="body-regular text-secondary-500">
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <input
        className="border-2 border-primary-400  focus:outline-none focus:ring-1 focus:border-2  text-secondary-500 body-regular w-full h-[42px] mt-2 rounded-[8px] p-2  mb-2"
        type={type}
        placeholder={placeholder}
        {...field}
        onChange={handleChange}
      />

      {meta.touched && meta.error && (
        <p className="text-red-500 body-regular">{meta.error || "\u00A0"}</p>
      )}
    </div>
  );
};

export default Input;
