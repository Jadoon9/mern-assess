import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white p-4 custom-shadow rounded-md mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-primary-500">Ropstam</div>
          <Link
            to="/"
            className={`text-secondary-500 transition duration-50 transform hover:scale-105  ${
              location.pathname === "/"
                ? "!text-primary-400 border-b-2 border-primary-400"
                : ""
            }`}
          >
            Cars
          </Link>

          {/* Link to Page 2 */}
          <Link
            to="/categories"
            className={`text-secondary-500  transition duration-50 transform hover:scale-105  ${
              location.pathname === "/categories"
                ? "!text-primary-400 border-b-2 border-primary-400"
                : ""
            }`}
          >
            Categories
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-secondary-500">Welcome, {data?.email}</span>

          <button
            className="bg-primary-500 text-white py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring focus:border-gray-900 transition duration-50 transform hover:scale-105 "
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "RESET" });
              toast.success("Logout Succesfully!");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
