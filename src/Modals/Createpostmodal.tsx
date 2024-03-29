import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "@mui/icons-material/Image";
import Closebtn from "../components/reusableComponents/Closebtn";
import { Button } from "@mui/material";
import { createPostApi } from "../api/loginauth";
import { useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../api/auth";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../components/reusableComponents/Alert";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useAppSelector } from "../features/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stylee = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 300,
  bgcolor: "white",
  border: "0px ",
  outline: "none",
  borderRadius: "4px",
};

type Props = {
  open: boolean;
  toggleModal: () => boolean | null | void;
};

type Message = {
  messgae: string;
};

const Createpostmodal = ({ open, toggleModal }: Props) => {
  const auth = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [related_text, setRelated_text] = useState<string>("");
  const [images, setImages] = useState<Array<String>>([]);
  const [imagesLength, setImagesLength] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  let payload = new FormData();
  function handleChange(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setLoading(true);
    const imageFiles = Array.from(target.files as ArrayLike<File>);
    setImagesLength(imageFiles.length);
    console.log(imageFiles, "len");
    let imgs: string[] = [];
    for (let i = 0; i < imageFiles.length; i++) {
      console.log(imageFiles[i], "images");
      payload.append("image", imageFiles[i]);
      axiosClient
        .post("posts/upload-image", payload)
        .then((res) => {
          imgs.push(res.data.image_url);
          setLoading(false);
          setOpened({ messgae: "Image Uploaded Successfully" });
        })
        .catch((err) => {
          console.log(err, "err");
          setError("something went wrong");
          setLoading(false);
        });
    }
    if (imgs) {
      setImages(imgs);
    }
  }
  console.log(loading, error, "fil");

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      setLoading(true);
      const savePost = {
        related_text,
        published: true,
        images,
      };
      if (!auth.id) {
        navigate("/login");
      }

      if (!savePost.related_text && savePost.images.length === 0) {
        throw new Error("All Fields Are Mandatory");
      }
      await createPostApi(savePost);
      await queryClient.invalidateQueries(["getdata"]);
      setLoading(false);
      setOpened({ messgae: "Post Created Successfully" });
      toggleModal();
      navigate("/");
    } catch (err) {
      setError("Network Error");
      setLoading(false);
      toggleModal();
    }
  }

  const dropModal = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      x: "-50%",
      y: "-50%",
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <div>
      <Modal open={open} className="backdrop-blur-sm ">
        <motion.div
          variants={dropModal}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={stylee}
          className="hover:drop-shadoww md:w-[400px] flex flex-col items-center justify-around relative bg-white w-[90%]"
        >
          <Closebtn onClick={toggleModal} />
          <form
            onSubmit={handleSubmit}
            className="w-[90%] h-[90%] flex flex-col justify-evenly items-center"
          >
            <div>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-center text-blue-900"
              >
                Create Post
              </Typography>
            </div>
            <div className="w-[90%]">
              <TextField
                id="standard-textarea"
                className="w-full "
                label="Share your thoughts..."
                placeholder="Enter titlle..."
                multiline
                variant="standard"
                onChange={(e) => {
                  setRelated_text(e.target.value);
                }}
              />
            </div>
            <div>
              {imagesLength > 1 ? (
                <span>{imagesLength} files selected</span>
              ) : imagesLength === 1 && !error ? (
                <span>{imagesLength} file selected</span>
              ) : (
                <label className="cursor-pointer">
                  <Image />
                  Add images
                  <input
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleChange}
                  />
                </label>
              )}
            </div>
            {loading && <ScaleLoader height={15} margin={1} />}
            <Snackbar
              open={!!opened}
              autoHideDuration={1000}
              onClose={() => setOpened(null)}
            >
              <Alert
                onClose={() => setOpened(null)}
                severity="success"
                sx={{ width: "100%" }}
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
            <Button type="submit">CreatePost</Button>
          </form>
        </motion.div>
      </Modal>
    </div>
  );
};

export default Createpostmodal;
