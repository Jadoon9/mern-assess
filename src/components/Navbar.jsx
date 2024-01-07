import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white p-4 custom-shadow rounded-md mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-[#9f7aea]">Ropstam</div>
          {/* Link to Page 1 */}
          <Link
            to="/"
            className={`text-gray-800 hover:underline ${
              location.pathname === "/" ? " border-b-2 border-[#9f7aea]" : ""
            }`}
          >
            Cars
          </Link>

          {/* Link to Page 2 */}
          <Link
            to="/categories"
            className={`text-gray-800 hover:underline ${
              location.pathname === "/categories"
                ? " border-b-2 border-[#9f7aea]"
                : ""
            }`}
          >
            Categories
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-800">Welcome, {data?.email}</span>

          <button
            className="bg-[#9f7aea] text-white py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring focus:border-gray-900"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "RESET" });
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
