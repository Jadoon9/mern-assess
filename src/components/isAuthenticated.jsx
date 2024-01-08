import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./Navbar";

// eslint-disable-next-line react/prop-types
const IsAuthenticated = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) <Navigate to="/login" />;

  return (
    <>
      {isLoggedIn ? (
        <>
          <NavBar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
};

export default IsAuthenticated;
