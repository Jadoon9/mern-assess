import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import IsAuthenticated from "./components/isAuthenticated";
import Cars from "./pages/Cars";
import Categories from "./pages/Categories";
import Toast from "./components/Toast";

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
      <Toast />
    </>
  );
}

export default App;
