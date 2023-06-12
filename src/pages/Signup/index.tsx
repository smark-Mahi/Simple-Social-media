import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";

const initialValues = {
  email: "",
  password: "",
};

const Signup = () => {
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values, "values");
    },
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  /*const onSubmitHandler =(values:any) => {
    console.log(values,'values')
  };*/
  const ButtonLink = styled(Button)({
    fontWeight: "bold",
    color: "indigo",
    cursor: "pointer",
  });
  return (
    <div className="bg-gray-50 flex items-center h-[80%] justify-center w-full h-screen px-16">
      <Box className="relative w-full h-[80%] max-w-md flex flex-col items-center justify-center shadow-2xl">
        <Box className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob "></Box>
        <Box className="absolute top-0 -right-4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-90 animate-blob animation-delay-2000 "></Box>
        <Box className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000 "></Box>
        <Box
          className="w-[60%] h-[80%] flex flex-col items-center justify-around"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-lg text-center font-bold">Sign Up</h1>
          <FormControl>
            <TextField
              id="standard-basic"
              label="email"
              name="email"
              variant="standard"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && <p>{errors.email}</p>}
          </FormControl>
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                value={values.password}
                onChange={handleChange}
                name="password"
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {errors.password && touched.password && <p>{errors.password}</p>}
          </Box>
          <Button variant="text" type="submit">
            signUp
          </Button>
        </Box>
        <Box className=" w-full h-[40%] flex justify-center items-center ">
          <h3 className="text-sm cursor-pointer">
            Already have an account?
            <NavLink to="/login">
              <ButtonLink className="text-indigo-600">Login</ButtonLink>
            </NavLink>
          </h3>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
