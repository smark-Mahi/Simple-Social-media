import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Closebtn from "../components/reusableComponents/Closebtn";
import MapsUgcRounded from "@mui/icons-material/MapsUgcRounded";
import { Checkbox, IconButton } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import flowerimg from ".././assets/amy-shamblen-qdPnQuGeuwU-unsplash.jpg";
import AddReactionOutlined from "@mui/icons-material/AddReactionOutlined";
import Input from "@mui/material/Input";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 550,
  bgcolor: "background.paper",
  border: "0px ",
  outline: "none",
  borderRadius: "4px",
};

type propstype = {
  open: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentSectionModal = ({ open, setShowModal }: propstype) => {
  const toggleModal = () => setShowModal(!open);
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => setShowModal(false)}
      className="backdrop-blur-sm "
    >
      <Box sx={style} className="flex ">
        <Closebtn onClick={toggleModal} />
        <Box className="basis-2/5 ">
          <img src={flowerimg} alt="image" className="h-full object-fill" />
        </Box>
        <Box className="basis-2/3  flex flex-col justify-between">
          <Box className=" flex p-3">
            <Avatar alt="Travis Howard" src="/" />
            <b className="ml-3">smark_x</b>
          </Box>
          <Box className="basis-2/3 overflow-auto no-scrollbar">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel autem
            esse sed doloremque cum quisquam, nostrum non sit sint quod ex
            nesciunt ipsam possimus perspiciatis aperiam, dignissimos totam
            nulla voluptates? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Voluptate libero iste aliquam repudiandae nulla et
            hic nam temporibus, placeat fugiat laborum distinctio quasi error
            natus, eum sed earum reprehenderit. Culpa? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Earum excepturi, modi, architecto
            totam facere dolore placeat expedita deserunt molestiae provident
            laboriosam, aliquid minima aliquam possimus quia? Culpa vero
            voluptas excepturi! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Non, consequuntur facilis facere iusto beatae
            nihil omnis error sint magnam ratione ipsa! Obcaecati suscipit
            exercitationem veniam rerum beatae totam accusamus officia! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Impedit eum rerum
            consequatur aliquid ipsa adipisci soluta? Vitae architecto ea
            debitis fuga pariatur eligendi, ipsam accusamus quisquam id quo!
            Officia, dignissimos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Earum sapiente provident debitis quisquam dolorem
            nemo? Dolore facilis nemo sunt omnis, quae voluptatem quia corporis,
            recusandae labore sapiente reiciendis, maxime nostrum. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Possimus accusantium
            dolor quibusdam quae perspiciatis neque sequi magni obcaecati
            inventore ea maxime vitae nostrum, vel consequuntur ducimus odio
            corporis ex eligendi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aliquid dicta incidunt sed fuga iste quasi! Modi
            autem distinctio optio quas a, perspiciatis rem magni explicabo
            neque provident rerum quisquam dignissimos! Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Aut deserunt obcaecati impedit.
            At quasi, excepturi dolor, voluptatum asperiores ab reprehenderit
            aliquid necessitatibus vitae earum similique minus ad beatae sint
            corrupti! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perspiciatis consequatur corporis asperiores quisquam, rem, dolorum
            ab, similique minima excepturi autem aperiam hic adipisci cupiditate
            molestiae! Repudiandae nostrum nisi inventore deleniti.
          </Box>
          <Box className=" flex flex-col basis-1/6">
            <Box>
              <IconButton className="mt-10">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                  className="hover:opacity-60 "
                />
              </IconButton>
              <IconButton>
                <MapsUgcRounded className="text-slate-600 cursor-pointer hover:opacity-70 hover:text-md" />
              </IconButton>
            </Box>
            <Typography component="p" className="pl-3">
              3 likes
            </Typography>
            <Box className="flex pb-6 pl-3 mt-6">
              <AddReactionOutlined />
              <input
                placeholder="Add a comment..."
                style={{ outline: "none" }}
                className="ml-6 w-full"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentSectionModal;
