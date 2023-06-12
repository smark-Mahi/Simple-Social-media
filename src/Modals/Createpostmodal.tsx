import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "@mui/icons-material/Image";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Closebtn from "../components/reusableComponents/Closebtn";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  border: "0px ",
  outline:"none",
  borderRadius: "4px",
  p: 4,
};

type propstype = {
  open: boolean;
  toggleModal:()=>boolean
};
const Createpostmodal = ({ open,toggleModal }: propstype) => {

console.log(open,'toggle')
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-blur-sm"
      >
        <Box
          sx={style}
          className="hover:drop-shadoww flex flex-col items-center justify-around relative"
        >
          <Closebtn onClick={toggleModal}/>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-center"
            >
              Create Post
            </Typography>
          </Box>
          <Box>
            <TextField
              sx={{ width: "35ch" }}
              id="standard-textarea"
              label="Share your thoughts"
              placeholder="Enter titlle..."
              multiline
              variant="standard"
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "35ch" }}
              id="standard-textarea"
              label="Share your thoughts"
              placeholder="Enter titlle..."
              multiline
              variant="standard"
            />
          </Box>
          <Box>
            <InputLabel htmlFor="standard-adornment-password">
              <Image />
              Add Image
              <Input type="file" sx={{ display: "none" }} />
            </InputLabel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Createpostmodal;
