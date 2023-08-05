import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, styled } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MapsUgcRounded from "@mui/icons-material/MapsUgcRounded";
import React, { useState } from "react";
import CommentSectionModal from "../Modals/CommentSectionModal";
import { addCommentsApi, addLikeApi } from "../api/loginauth";
import Carousel from "./Carousel";
import { useQueryClient } from "@tanstack/react-query";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Confirmdeletemodal from "../Modals/Confirmdeletemodal";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Singlepost = ({ items }: any) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showCommentsPage, setShowCommentsPage] = React.useState<any | null>(
    null
  );
  const [openMenu, setopenMenu] = useState<boolean>(false);
  const [open, setOpen] = useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [forced, setForced] = useState<number | null>(null);
  const toggle = (id: number) => setOpen(id);
  const CustomCard = styled(Card)({
    backgroundColor: "white",
    color: "#708090",
  });

  const removeVote = async (id: number) => {
    await addLikeApi({ post_id: id, dir: 0 });
    await queryClient.invalidateQueries(["getdata"]);
  };

  const addVote = async (id: number) => {
    await addLikeApi({ post_id: id, dir: 1 });
    await queryClient.invalidateQueries(["getdata"]);
  };

  const addComment = async (id: number) => {
    console.log(inputRef.current?.value, "refval");
    await addCommentsApi({ post_id: id, comment: inputRef.current?.value });
    await queryClient.invalidateQueries(["getdata"]);
  };

  const getId = (id: number) => {
    console.log(id, "postid");
    setopenMenu(true);
  };

  return (
    <>
      <CustomCard className="border-slate-300 border-solid border-[1px] cursor-pointer rounded-3xl flex flex-col hover:shadow-2xl  md:w-[50%]">
        <div className="relative">
          <CardHeader
            avatar={
              <img
                src={items.post.owner.profile_photo}
                alt="p"
                className="w-[50px] h-[50px] rounded-full"
              />
            }
            action={
              <>
                <IconButton
                  aria-label="settings"
                  onClick={() => getId(items.post.id)}
                  sx={{ color: "black" }}
                >
                  <MoreVertIcon />
                </IconButton>
              </>
            }
            title={
              <p onClick={() => navigate(`/posts/user/${items.post.owner_id}`)}>
                {items.post.owner.username}
              </p>
            }
            subheader={dayjs(items.created_at).format("DD-MM-YYYY")}
          />
          {openMenu && (
            <div className="w-[90px] h-max bg-white absolute right-4 top-12 shadow-xl z-50 rounded-sm on">
              <p className=" cursor-pointer text-slate-500 text-center p-2 hover:bg-slate-500 hover:text-white">
                Update
              </p>
              <p
                className=" cursor-pointer text-slate-500 text-center p-2  hover:bg-slate-500 hover:text-white"
                onClick={() => {
                  toggle(items.post.id);
                }}
              >
                Delete
              </p>
              <p
                className=" cursor-pointer text-slate-500 text-center pb-2  hover:bg-slate-500 hover:text-white"
                onClick={() => navigate(`/posts/${items.post.id}`)}
              >
                Go To Post
              </p>
              <p
                className=" cursor-pointer text-slate-500 text-center pb-2  hover:bg-slate-500 hover:text-white"
                onClick={() => {
                  setopenMenu(false);
                }}
              >
                Cancel
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          {items.post.images.length > 1 ? (
            <Carousel items={items} />
          ) : (
            <img src={items.post.images[0]} />
          )}
        </div>
        <CardContent>
          <IconButton>
            {items.votes === 1 || items.votes > 1 ? (
              <Favorite
                sx={{ color: "red" }}
                onClick={() => removeVote(items.post.id)}
              />
            ) : (
              <FavoriteBorder
                onClick={() => addVote(items.post.id)}
                sx={{ color: "gray" }}
              />
            )}
          </IconButton>
          <MapsUgcRounded
            className="text-slate-600 cursor-pointer hover:opacity-70 hover:text-md"
            onClick={() => setShowCommentsPage(items.post)}
          />
          <Typography component="p">
            {items.votes !== 1 ? (
              <p>{items.votes} likes</p>
            ) : items.votes === 0 ? (
              <p>No likes</p>
            ) : (
              <p>{items.votes} like</p>
            )}
          </Typography>
          <Typography variant="body2">
            <b>{items.post.owner.username}</b> &nbsp;
            {items.post.related_text.length > 20 ? (
              <span className="text-sm">
                {items.post.related_text.slice(0, 11)}&nbsp; more....
              </span>
            ) : (
              <span className="text-sm">{items.post.related_text}</span>
            )}
          </Typography>
          <p
            className="text-sm text-gray-400 cursor-pointer hidden md:block"
            onClick={() => setShowCommentsPage(items)}
          >
            {items.post.comments.length > 2 ? (
              <p>view all {items.post.comments.length} comments</p>
            ) : items.post.comments.length === 0 ? (
              <p>No comments</p>
            ) : (
              <p>view {items.post.comments.length} comment</p>
            )}
          </p>
          <p
            className="md:hidden text-sm text-gray-400 cursor-pointer"
            onClick={() => navigate(`/comments/${items.post.id}`)}
          >
            {items.post.comments.length > 2 ? (
              <p>view all {items.post.comments.length} comments</p>
            ) : items.post.comments.length === 0 ? (
              <p>No comments</p>
            ) : (
              <p>view {items.post.comments.length} comment</p>
            )}
          </p>
          {items.post.comments[0] && (
            <Typography variant="body2">
              <b>commenter username</b> &nbsp;
              {items.post.comments[0].comment.length > 20 ? (
                <span className="text-sm">
                  {items.post.comments[0].comment.slice(0, 11)}&nbsp;....
                </span>
              ) : (
                <span className="text-sm">
                  {items.post.comments[0].comment}
                </span>
              )}
            </Typography>
          )}
          {items.post.comments[1] && (
            <Typography variant="body2">
              <b>commenter username</b> &nbsp;
              {items.post.comments[1].comment.length > 20 ? (
                <span className="text-sm">
                  {items.post.comments[1].comment.slice(0, 11)}&nbsp;....
                </span>
              ) : (
                <span className="text-sm">
                  {items.post.comments[1].comment}
                </span>
              )}
            </Typography>
          )}
          <div className="hidden md:block md:flex">
            <input
              placeholder="Add a comment..."
              className="w-full text-black text-sm mt-2 outline-0 border-slate-500 border-b-2"
              ref={inputRef}
              onClick={() => setForced(items.post.id)}
            />
            {forced ? (
              <p
                className="mt-8 text-red-500 text-sm "
                onClick={() => addComment(items.post.id)}
              >
                Post
              </p>
            ) : (
              ""
            )}
          </div>
        </CardContent>
      </CustomCard>
      {showCommentsPage && (
        <CommentSectionModal
          open={!!showCommentsPage}
          posts={showCommentsPage}
          setShowModal={setShowCommentsPage}
        />
      )}
      {open && (
        <Confirmdeletemodal
          open={!!open}
          id={open}
          setOpen={setOpen}
          setopenMenu={setopenMenu}
        />
      )}
    </>
  );
};

export default Singlepost;
