import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import IsAuthenticated from "./components/isAuthenticated";
import Cars from "./pages/Cars";
import Categories from "./pages/Categories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<IsAuthenticated />}>
          <Route path="/" element={<Cars />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <ToastContainer
        style={{ fontSize: "16px" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"light"}
      />
    </>
  );
}

export default App;
