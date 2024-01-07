/* eslint-disable react/prop-types */
import React from "react";

const Button = ({ btnText, onClick, nobg, type, disabled, className }) => {
  return (
    <button
      className={`w-full cursor-pointer tracking-wider text-black text-center ${
        nobg ? "" : "primary-background"
      } py-[8px] px-auto rounded-[8px] primary-border-color ${
        disabled || undefined
          ? "bg-red-400 border-primary-lighter cursor-not-allowed"
          : "hover:bg-primary hover:border-primary"
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
