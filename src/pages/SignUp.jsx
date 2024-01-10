import React from "react";
import bgImage from "/assets/loginbg.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { signUpValSchema } from "../utils/validations";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useSignUpMutation } from "../redux/services/Auth";
// import { useMutation } from "@tanstack/react-query";
// import { signUp } from "../reactQueryPractice/authActions";

const SignUp = () => {
  const [signupUser, { isLoading, isSuccess, isError, error, data }] =
    useSignUpMutation();
  const navigate = useNavigate();

  // const { data, error, isPending, isError, isSuccess, mutate } = useMutation({
  //   mutationFn: signUp,
  // });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/sign-in");
    }
    if (isError) {
      toast.error(error?.respnse?.data?.message);
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
        }}
        validationSchema={signUpValSchema}
        onSubmit={(values) => {
          // mutate({ email: values.email });
          signupUser({ email: values.email });
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-col bg-white justify-between custom-shadow gap-3 max-h-[550px] w-[640px] p-10 rounded-[16px] ">
              <h2 className="h2-bold">Create an account</h2>

              <Input
                type="text"
                placeholder="test"
                label="Email"
                name="email"
                isRequired
              />

              <p
                className="body-regular  primary-color cursor-pointer border-b border-[primary-color] w-fit"
                onClick={() => navigate("/sign-in")}
              >
                Already have an account? Sign In
              </p>
              <Button type="submit" btnText="SIGN UP" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
