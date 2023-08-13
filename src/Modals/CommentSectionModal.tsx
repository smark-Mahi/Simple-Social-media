import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Closebtn from "../components/reusableComponents/Closebtn";
import MapsUgcRounded from "@mui/icons-material/MapsUgcRounded";
import { IconButton } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddReactionOutlined from "@mui/icons-material/AddReactionOutlined";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Carousel from "../components/Carousel";
import {
  addCommentsApi,
  addLikeApi,
  getAllCommentsById,
} from "../api/loginauth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 400,
  backgroundColor: "white",
  border: "0px ",
  outline: "none",
  borderRadius: "4px",
};

type ToggleModal = () => boolean | void;

type propstype = {
  open: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  posts: any;
};

const CommentSectionModal = ({ open, setShowModal, posts }: propstype) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [addComment, setAddComment] = useState<string>("");
  const { data } = useQuery({
    queryKey: ["comments", posts.post.id],
    queryFn: () => getAllCommentsById(posts.post.id),
  });

  const toggleModal: ToggleModal = () => setShowModal(!open);
  const addComments = async () => {
    await addCommentsApi({ post_id: posts.post.id, comment: addComment });
    await queryClient.invalidateQueries(["comments", posts.post.id]);
    await queryClient.invalidateQueries(["getdata"]);
    setAddComment("");
  };

  const removeVote = async (id: number) => {
    await addLikeApi({ post_id: id, dir: 0 });
    //tell ark to add votes count in allcomments api
    await queryClient.invalidateQueries(["getdata"]);
  };

  const addVote = async (id: number) => {
    try {
      await addLikeApi({ post_id: id, dir: 1 });
      //tell ark to add votes count in allcomments api
      await queryClient.invalidateQueries(["getdata"]);
    } catch (error) {
      if (error instanceof Error && error.message === "Access token expired") {
        navigate("/login");
      }
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
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => setShowModal(false)}
      className="backdrop-blur-sm"
    >
      <motion.div
        variants={dropModal}
        initial="hidden"
        animate="visible"
        exit="exit"
         style={style} className="flex">
        <Closebtn onClick={toggleModal} />
        <div className="basis-2/3">
          {posts.post.images.length > 1 ? (
            <div className=" overflow-hidden">
              <Carousel images={posts.post.images} />
            </div>
          ) : (
            <img
              src={posts.post.images[0]}
              style={{
                aspectRatio: 1,
                objectFit: "contain",
              }}
              className="h-full"
            />
          )}
        </div>
        <div className="basis-2/4  flex flex-col justify-between">
          <div className=" flex p-3">
            <img
              src={posts.post.owner.profile_photo}
              alt="p"
              className="w-[25px] h-[25px] rounded-full"
              style={{ border: "1px solid black" }}
            />
            <b className="ml-3">{posts.post.owner.username}</b>
          </div>
          <div className="basis-2/3 overflow-auto no-scrollbar">
            {data &&
              data.map((comment: any) => (
                <Typography
                  variant="body2"
                  className="p-2 flex gap-2"
                  key={comment.id}
                >
                  <img
                    src={comment.user.profile_photo}
                    alt="p"
                    className="w-[25px] h-[25px] rounded-full"
                    style={{ border: "1px solid black" }}
                  />
                  <b className="text-sm">{comment.user.username}</b>
                  <span className="text-sm">{comment.comment}</span>
                </Typography>
              ))}
          </div>
          <div className=" flex flex-col basis-1/6">
            <div>
              <IconButton>
                {posts.votes === 1 || posts.votes > 1 ? (
                  <Favorite
                    sx={{ color: "red" }}
                    onClick={() => removeVote(posts.post.id)}
                  />
                ) : (
                  <FavoriteBorder onClick={() => addVote(posts.post.id)} />
                )}
              </IconButton>
              <IconButton>
                <MapsUgcRounded className="text-slate-600 cursor-pointer hover:opacity-70 hover:text-md" />
              </IconButton>
            </div>
            <Typography component="p" className="pl-3">
              {posts.votes !== 1 ? (
                <p>{posts.votes} likes</p>
              ) : posts.votes === 0 ? (
                <p>No likes</p>
              ) : (
                <p>{posts.votes} like</p>
              )}
            </Typography>
            <div className="flex pb-6 pl-3 mt-6">
              <AddReactionOutlined />
              <input
                placeholder="Add a comment..."
                style={{ outline: "none" }}
                className="ml-6 w-full"
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
              />
              {addComment.length > 0 ? (
                <p
                  className="mr-2 ml-2 text-red-500 text-sm cursor-pointer"
                  onClick={addComments}
                >
                  Post
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default CommentSectionModal;
