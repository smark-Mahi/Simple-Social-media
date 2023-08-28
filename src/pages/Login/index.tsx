import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { useAppDispatch } from "../../features/store";
import { loginApi } from "../../api/loginauth";
import jwtDecode from "jwt-decode";
import { setAuth } from "../../helpers/Tokens";
import { login } from "../../features/userSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Alert } from "../../components/reusableComponents/Alert";
import { Snackbar } from "@mui/material";
import { SignUpContext } from "../../Context/SignUPInfoContext";
import { useEffect } from "react";
import { motion } from "framer-motion";

const initialValues = {
  email: "",
  password: "",
};
type val = {
  email: string;
  password: string;
};

type Decode = {
  user_id: number;
  exp: number;
};

const Login = () => {
  const [windowWidth, setWindoWidth] = useState(window.innerWidth);

  const handleWindowWidth = () => {
    setWindoWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidth);

    return () => {
      window.removeEventListener("resize", handleWindowWidth);
    };
  }, [windowWidth]);
  //Context
  const { loading, setError, setLoading, error } = useContext(SignUpContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => onSubmitHandler(values),
    });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmitHandler = async (values: val) => {
    try {
      setLoading(true);
      const payload = {
        username: values.email.trim(),
        password: values.password.trim(),
      };

      const data = await loginApi(payload);

      const decoded = jwtDecode(data.data.access_token) as Decode;
      console.log(data, "datalogin", decoded);
      const user = {
        isAuth: true,
        id: decoded.user_id,
        accessToken: data.data.access_token,
        exp: decoded.exp,
      };
      setAuth(user);
      dispatch(login(user));
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setError("something went wrong");
      setLoading(false);
      console.log(err, "err");
    }
  };
  console.log(error, "err");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="bg-white flex  items-center justify-center w-screen h-screen "
    >
      <div className=" relative  md:w-full h-[60%] max-w-md flex flex-col items-center justify-center border-1 rounded-lg border-indigo-200 shadow-2xl bg-white">
        <div
          className={`absolute top-0 -left-4 w-72 h-72 md:w-[450px] md:h-96 bg-purple-200 md:bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-100 ${
            windowWidth <= 380 ? "animate-blob" : ""
          }`}
        ></div>
        <div
          className={`absolute top-0 -right-4 w-72  h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-100 animation-delay-2000 ${
            windowWidth <= 380 ? "animate-blob" : ""
          }`}
        ></div>
        <div
          className={`absolute -bottom-8  w-72 h-72 md:w-[500px] md:h-96 bg-pink-200 md:bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-90 animation-delay-4000 ${
            windowWidth <= 380 ? "animate-blob" : ""
          }`}
        ></div>
        <Box
          className="w-full flex flex-col items-center justify-between rounded-b-3xl border-b-2 border-indigo-100"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" },
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <h1 className="text-lg text-center font-bold text-slate-500">
              Log In
            </h1>
          </div>
          <FormControl className="mt-4">
            <TextField
              id="standard-basic"
              label="email"
              name="email"
              variant="standard"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="text-sm text-customred-400">{errors.email}</p>
            ) : null}
          </FormControl>
          <div>
            <FormControl variant="standard" className="w-full">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                color="primary"
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
          </div>
          <Button variant="text" type="submit">
            {loading ? <ScaleLoader height={15} margin={1} /> : "Login"}
          </Button>

          <Snackbar
            open={!!error}
            autoHideDuration={1000}
            onClose={() => setError(null)}
          >
            <Alert
              onClose={() => setError(null)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Box>
        <div className=" w-full h-[25%] flex  justify-center items-center">
          <h3 className="text-sm font-bold cursor-pointer text-center text-slate-500">
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
    </motion.div>
  );
};

export default Login;
