import * as yup from "yup";

export const signUpValSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});
export const loginValSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
export const categorySchema = yup.object({
  catName: yup.string().required("Name is required"),
});
export const carSchema = yup.object({
  catName: yup.string().required("Category is required"),
  // carName: yup.string().required("Car name is required"),
  // color: yup.string().required("Car color is required"),
  // model: yup.string().required("Car modle is required"),
  // maker: yup.string().required("Car maker is required"),
  // regNumb: yup.string().required("Registeration number is required"),
});
