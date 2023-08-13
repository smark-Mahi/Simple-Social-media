import React, { useContext } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Closebtn from "../components/reusableComponents/Closebtn";
import { deletePostApi } from "../api/loginauth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { Alert } from "../components/reusableComponents/Alert";
import ScaleLoader from "react-spinners/ScaleLoader";
import { SignUpContext } from "../Context/SignUPInfoContext";
import { motion } from "framer-motion";

type propstype = {
  open: boolean;
  id: number;
  setOpen: (value: React.SetStateAction<number | null>) => void;
  setopenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Confirmdeletemodal = ({ open, setOpen, id, setopenMenu }: propstype) => {
  const { loading, setLoading, error, setError } = useContext(SignUpContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bagroundColor: "white",
    p: 4,
    border: "0px ",
    outline: "none",
    borderRadius: "4px",
  };

  const deletePost = async () => {
    try {
      setLoading(true);
      await deletePostApi(id);
      await queryClient.invalidateQueries(["getdata"]);
      setOpen(null);
      setLoading(false);
      navigate("/");
      setopenMenu(false);
    } catch (err) {
      console.log(err, "err");
      setLoading(false);
      setError("Something Went Wrong");
      setOpen(null);
      setopenMenu(false);
      navigate("/");
      setError("");
    }
  };

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
    <Modal open={open} className="backdrop-blur-sm ">
      <motion.div
        variants={dropModal}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={style}
        className="relative md:w-[300px] w-[90%] bg-white h-[150px] flex flex-col justify-evenly "
      >
        <Closebtn onClick={() => setOpen(null)} />
        <p className="text-center font-bold">Do you want to Delete</p>
        <div className="flex justify-evenly mt-4">
          <Button variant="outlined" onClick={deletePost}>
            Yes
          </Button>
          {loading ? <ScaleLoader height={15} margin={1} /> : ""}
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
          <Button variant="outlined" onClick={() => setOpen(null)}>
            No
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default Confirmdeletemodal;
