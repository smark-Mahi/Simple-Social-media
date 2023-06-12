import React from "react";
import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
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
import { loginSchema } from "../../schema";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../features/store";
import { loginApi } from "../../api/loginauth";
import jwtDecode from "jwt-decode";
import { setAuth } from "../../helpers/Tokens";
import { login } from "../../features/userSlice";

const initialValues = {
  username: "",
  password: "",
};
type val = {
  username: string;
  password: string;
};
const Login = () => {
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => onSubmitHandler(values),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmitHandler = async (values: val) => {
    console.log(values);
    try {
      const payload = {
        username: values.username.trim(),
        password: values.password.trim(),
      };

      const data = await loginApi(payload);

      console.log(data);
      const user = {
        name: "sum",
        accessToken: data.data.access_token,
        refreshToken: "ni hi",
      };
      console.log(user);
      setAuth(user);
      dispatch(login(user));
      navigate("/");
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <div className="bg-gray-50 flex h-[80%] items-center justify-center w-full h-screen px-16">
      <div className="relative w-full h-[80%] max-w-md flex flex-col items-center justify-center border-1 rounded-lg border-indigo-200 shadow-2xl">
        <Box className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob "></Box>
        <Box className="absolute top-0 -right-4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-90 animate-blob animation-delay-2000 "></Box>
        <Box className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000 "></Box>
        <Box
          className="w-full h-[90%] flex flex-col items-center justify-around rounded-b-3xl border-b-2 border-indigo-100"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-lg text-center font-bold">Log In</h1>
          <FormControl>
            <TextField
              id="standard-basic"
              label="username"
              name="username"
              variant="standard"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && touched.username && (
              <p className="text-sm text-customred-400">{errors.username}</p>
            )}
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
            {errors.password && touched.password && (
              <p className="text-sm text-customred-400">{errors.password}</p>
            )}
          </Box>
          <Button variant="text" type="submit">
            Login
          </Button>
        </Box>
        <div className=" w-full h-[40%] flex justify-center items-center ">
          <h3 className="text-sm font-bold cursor-pointer">
            Dont you have an account?
            <NavLink to="/signup">
              <Button
                sx={{ fontWeight: "30px" }}
                variant="text"
                className="font-bold"
                // onClick={() => setShowPage(true)}
                type="submit"
              >
                Sign Up
              </Button>
            </NavLink>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
