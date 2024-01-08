/* eslint-disable react/no-unescaped-entities */
import React from "react";
import bgImage from "../assets/loginbg.svg";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginValSchema } from "../utils/validations";
import { useLoginMutation } from "../api/services/authenticationActions";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { userLogin } from "../api/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading, isSuccess, isError, error, data }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      localStorage.setItem("token", data?.data?.token);
      dispatch(userLogin({ data: data?.data?.user, isLoggedIn: true }));
      navigate("/");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    <Loader />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValSchema}
        onSubmit={(values) => {
          loginUser({ email: values.email, password: values.password });
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-col bg-white justify-between custom-shadow h-[500px] w-[640px] p-10 rounded-[16px] ">
              <h2 className="h2-bold">Sign In to your account</h2>
              <Input
                type="text"
                placeholder="test"
                label="Email"
                name="email"
              />
              <Input
                type="password"
                placeholder="password"
                label="Password"
                name="password"
              />

              <p
                className="body-regular  primary-color cursor-pointer border-b border-[primary-color] w-fit  "
                onClick={() => navigate("/sign-up")}
              >
                Don't have an account ? Sign Up
              </p>
              <Button type="submit" btnText="SIGN IN" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
