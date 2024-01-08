import React from "react";
import { FallingLines } from "react-loader-spinner";

const CustomLoader = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <FallingLines color="#9f7aea" width="100" visible={true} />
    </div>
  );
};

export default CustomLoader;
