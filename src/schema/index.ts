import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("please enter username"),
  password:yup.string().required("This is required field").min(6,"must be of 6 characters long")
});

export const signUpSchema = yup.object({
    email: yup.string().email().required("please enter email"),
    password:yup.string().required("This is required field").min(6,"must be of 6 characters long")
  });
  
  