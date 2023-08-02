import React, { useContext, useState } from "react";
import Image from "@mui/icons-material/Image";
import { axiosClient } from "../api/auth";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../components/reusableComponents/Alert";
import ScaleLoader from "react-spinners/ScaleLoader";
import { TextField } from "formik-mui";
import { Field } from "formik";
import { SignUpContext } from "../Context/SignUPInfoContext";

const CreateProfileInfo = () => {
  //Context
  const { setImages, error, setError, opened, setOpened, loading, setLoading } =
    useContext(SignUpContext);

  //state
  const [imagesLength, setImagesLength] = useState<number>(0);

  let payload = new FormData();
  function handleChanges(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files, "fil");
    setLoading(true);
    const imageFiles = Array.from(e.target.files as ArrayLike<File>);
    setImagesLength(imageFiles.length);
    console.log(imageFiles, "len");
    for (let i = 0; i < imageFiles.length; i++) {
      console.log(imageFiles[i], "images");
      payload.append("image", imageFiles[i]);
      axiosClient
        .post("posts/upload-image", payload)
        .then((res) => {
          setImages(res.data.image_url);
          setLoading(false);
          setOpened({ messgae: "Image Uploaded Successfully" });
        })
        .catch((error) => {
          console.log(error);
          setError("something went wrong");
          setLoading(false);
        });
    }
  }

  return (
    <div className="w-full h-[80%] flex flex-col items-center justify-around mt-8">
      <div className="w-full text-center">
        <Field
          label="full Name"
          name="fullName"
          id="fullName"
          className="w-[80%]"
          component={TextField}
          disabled={false}
        />
      </div>
      <div className="w-full text-center">
        <Field
          label="user Name"
          name="userName"
          id="userName"
          className="w-[80%]"
          component={TextField}
          disabled={false}
        />
      </div>
      <div className="w-full text-center">
        <Field
          label="about"
          name="about"
          id="about"
          className="w-[80%]"
          component={TextField}
          disabled={false}
        />
      </div>
      <div className="text-center">
        {imagesLength > 1 ? (
          <span>{imagesLength} files selected</span>
        ) : imagesLength === 1 ? (
          <span>{imagesLength} file selected</span>
        ) : (
          <label className="cursor-pointer">
            <Image />
            Add Profile Photo
            <input
              type="file"
              style={{ display: "none" }}
              multiple={false}
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleChanges}
            />
          </label>
        )}
        {loading && <ScaleLoader height={15} margin={1} />}
      </div>
      <Snackbar
        open={!!opened}
        autoHideDuration={1000}
        onClose={() => setOpened(null)}
      >
        <Alert
          onClose={() => setOpened(null)}
          severity="success"
          className="w-full"
        >
          {opened?.messgae}
        </Alert>
      </Snackbar>
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
    </div>
  );
};

export default CreateProfileInfo;
