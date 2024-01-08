/* eslint-disable react/prop-types */
import React from "react";

const Button = ({ btnText, onClick, nobg, type, disabled, className }) => {
  return (
    <button
      className={`w-full cursor-pointer tracking-wider text-secondary-500 transition duration-50 transform hover:scale-105 text-center ${
        nobg ? "" : "bg-primary-400"
      } py-[8px] px-auto rounded-[8px] border-primary-400 ${
        disabled || undefined
          ? "bg-red-400 border-primary-400 cursor-not-allowed "
          : "hover:bg-primary-300 hover:border-primary-300"
      } ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled || undefined}
    >
      <div className="flex-center base-medium gap-2">{btnText}</div>
    </button>
  );
};

export default Button;
