import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";
import { useContext, useState } from "react";
import SignUpInfo from "../../components/SignUpInfo";
import { createProfileSchema, signUpSchema } from "../../schema";
import CreateProfileInfo from "../../components/CreateProfileInfo";
import { Form, Formik, FormikValues } from "formik";
import { SignUpContext } from "../../Context/SignUPInfoContext";
import { ObjectSchema } from "yup";
import { createAccount } from "../../api/loginauth";
import { useNavigate } from "react-router-dom";

type basicValidationSchema = ObjectSchema<{
  email: string;
  password: string;
  confirmpassword: string;
}>;

type advanceValidationSchema = ObjectSchema<{
  fullName: string;
  userName: string;
  about: string;
}>;

type MultiComponentTypes = {
  [key: number]: {
    component: React.ReactElement | React.ReactElement[];
    validationSchema: basicValidationSchema | advanceValidationSchema;
    initialValues: {
      email?: string;
      password?: string;
      confirmpassword?: string;
      fullName?: string;
      userName?: string;
      about?: string;
    };
    title: string;
  };
};

const Signup = () => {
  const navigate = useNavigate();
  const { images } = useContext(SignUpContext);

  const ButtonLink = styled(Button)({
    fontWeight: "bold",
    color: "indigo",
    cursor: "pointer",
  });

  const [step, setStep] = useState<number>(1);

  const steps: MultiComponentTypes = {
    1: {
      component: <SignUpInfo />,
      validationSchema: signUpSchema,
      initialValues: {
        email: "",
        password: "",
        confirmpassword: "",
      },
      title: "Sign Up",
    },
    2: {
      component: <CreateProfileInfo />,
      validationSchema: createProfileSchema,
      initialValues: {
        fullName: "",
        userName: "",
        about: "",
      },
      title: "Create Profile",
    },
  };

  const isLastpage = step === Object.keys(steps).length;

  const nextStep = () => setStep((prevpage) => prevpage + 1);

  const previousStep = () => setStep((currPage) => currPage - 1);

  const handleSubmit = async (values: FormikValues) => {
    if (isLastpage) {
      const payload = {
        username: values.userName,
        full_name: values.fullName,
        email: values.email,
        password: values.password,
        about: values.about,
        profile_photo: images,
      };
      await createAccount(payload);
      navigate("/login");
      console.log(payload, "payload");
    } else {
      nextStep();
    }
  };
  console.log(steps[step], "s");
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <div className="w-[80%]  h-2 rounded-md md:w-[30%] bg-slate-500 text-white ">
        <div
          style={{ width: step === 1 ? "50%" : "100%" }}
          className="h-[100%] bg-blue-100 w-[50%]"
        ></div>
      </div>
      <div className="bg-gray-50 flex items-center min-h-fit justify-center w-[450px] md:w-full h-screen px-16 ">
        <div className="relative w-[600px] md:w-full h-[80%] max-w-md flex flex-col items-center justify-center shadow-2xl">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob "></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-90 animate-blob animation-delay-2000 "></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000 "></div>
          <Formik
            initialValues={steps[step].initialValues}
            validationSchema={steps[step].validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="w-full ">
              <div className="mt-2">
                <h1 className="text-lg text-center font-bold">
                  {steps[step].title}
                </h1>
              </div>
              {steps[step].component}
              <div
                className={`flex  mt-4  ${
                  step === 1 ? "justify-end mr-8" : "justify-around"
                }`}
              >
                {step > 1 && <Button onClick={previousStep}>Prev</Button>}
                <Button type="submit">{isLastpage ? "submit" : "Next"}</Button>
              </div>
            </Form>
          </Formik>
          <div className=" w-full h-[40%] flex justify-center items-center ">
            <h3 className="text-sm cursor-pointer text-center">
              Already have an account?
              <NavLink to="/login">
                <ButtonLink className="text-indigo-600">Login</ButtonLink>
              </NavLink>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
