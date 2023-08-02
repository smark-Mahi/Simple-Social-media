import React from "react";
import { CheckboxWithLabel, TextField } from "formik-mui";
// import { ErrorMessage } from "formik";
import { Field } from "formik";

const SignUpInfo = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div className="w-full h-[80%] flex flex-col items-center justify-around mt-8">
      <div className="w-full text-center">
        <Field
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
          <Field
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
          <Field
            component={CheckboxWithLabel}
            type="checkbox"
            name="checkbox"
            id="checkbox"
            disabled={false}
            checked={showPassword}
            Label={{ label: "show password" }}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
      </div>
      <div className="w-full text-center">
        <Field
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
