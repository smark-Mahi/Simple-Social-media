import React from "react";
import { CheckboxWithLabel, TextField } from "formik-mui";
// import { ErrorMessage } from "formik";
import { Field } from "formik";
import { styled } from "@mui/material";

const SignUpInfo = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const CustomField = styled(Field)({
    "& label.Mui-focused": {
      color: "gray",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "gray",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "gray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gray",
      },
    },
  });
  return (
    <div className="w-full h-[80%] flex flex-col items-center justify-around mt-8">
      <div className="w-full text-center">
        <CustomField
          label="Email"
          name="email"
          id="email"
          className="w-[80%]"
          component={TextField}
          disabled={false}
        />
      </div>
      <div className="flex flex-col justify-center w-full">
        <div className="text-center">
          <CustomField
            name="password"
            component={TextField}
            id="password"
            label="Password"
            className="w-[80%]"
            disabled={false}
            type={showPassword ? "text" : "password"}
          />
        </div>
        <div className="ml-10">
          <CustomField
            component={CheckboxWithLabel}
            type="checkbox"
            name="checkbox"
            id="checkbox"
            disabled={false}
            checked={showPassword}
            className="text-slate-500"
            Label={{ label: "show password" }}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
      </div>
      <div className="w-full text-center">
        <CustomField
          name="confirmpassword"
          component={TextField}
          label="confirm Password"
          id="confirmpassword"
          disabled={false}
          className="w-[80%]"
          type="password"
        />
      </div>
    </div>
  );
};

export default SignUpInfo;
