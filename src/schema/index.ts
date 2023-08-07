import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("please enter email"),
  password: Yup.string()
    .min(6, "password must be of 6 characters long")
    .required("This is required field"),
});

const psswordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email().required("please enter email"),
  password: Yup.string()
    .min(6, "password must be of 6 characters long")
    .matches(psswordRules, { message: "please create a strong password" })
    .required("This is required field"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "password must match")
    .required("This is required field"),
});

export const createProfileSchema = Yup.object({
  fullName: Yup.string().min(1).required("please enter Full Name"),
  userName: Yup.string().min(1).required("please enter User Name"),
  about: Yup.string().min(1).required("Required"),
});
