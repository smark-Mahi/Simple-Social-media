import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, styled } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MapsUgcRounded from "@mui/icons-material/MapsUgcRounded";
import React, { useState } from "react";
import CommentSectionModal from "../../Modals/CommentSectionModal";
import { useQuery } from "@tanstack/react-query";
import { addLikeApi, getPostsByIdApi } from "../../api/loginauth";
import Carousel from "../../components/Carousel";
import { useQueryClient } from "@tanstack/react-query";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Confirmdeletemodal from "../../Modals/Confirmdeletemodal";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SkeletonPost from "../../helpers/skeletons/SkeletonPost";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const PostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = +(params.id ?? 0);
  const queryClient = useQueryClient();
  const [showCommentsPage, setShowCommentsPage] = React.useState<any | null>(
    null
  );
  const [openMenu, setopenMenu] = useState<boolean>(false);
  const [open, setOpen] = useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [forced, setForced] = useState<boolean>(false);
  const toggle = (id: number) => setOpen(id);
  const CustomCard = styled(Card)({
    backgroundColor: "white",
    color: "#708090",
    width: "400px",
  });

  const { data, error } = useQuery({
    queryKey: ["getdata", id],
    queryFn: () => getPostsByIdApi(id),
  });

  const removeVote = async (id: number) => {
    await addLikeApi({ post_id: id, dir: 0 });
    await queryClient.invalidateQueries(["getdata"]);
  };

  const addVote = async (id: number) => {
    await addLikeApi({ post_id: id, dir: 1 });
    await queryClient.invalidateQueries(["getdata"]);
  };
  const getId = (id: number) => {
    console.log(id, "postid");
    setopenMenu(true);
  };

  console.log(data, "data");
  return (
    <>
      {error ? (
        <p>error</p>
      ) : !data ? (
        <div className="p-4 grid place-items-center md:p-20 gap-5 mt-12 md:mt-0">
          <SkeletonPost />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          className="flex justify-center"
        >
          <CustomCard className="cursor-pointer border-slate-100 border-2 md:mt-6 mt-14">
            <div className="relative">
              <CardHeader
                avatar={
                  <img
                    src={data.post.owner.profile_photo}
                    alt={data.post.owner.username[0]}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon onClick={() => getId(data.post.id)} />
                  </IconButton>
                }
                title={data.post.owner.username}
                subheader={dayjs(data.created_at).format("DD-MM-YYYY")}
              />
              {openMenu && (
                <div className="w-[90px] h-[110px] bg-white absolute right-4 top-12 shadow-xl z-50 rounded-sm ">
                  <p className=" cursor-pointer text-slate-500 text-center p-2 hover:bg-slate-500 hover:text-white">
                    Update
                  </p>
                  <p
                    className=" cursor-pointer text-slate-500 text-center p-2  hover:bg-slate-500 hover:text-white"
                    onClick={() => {
                      toggle(data.post.id);
                    }}
                  >
                    Delete
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
            <div className=" max-w-[400px] ">
              {data.post.images.length > 1 ? (
                <Carousel images={data.post.images} />
              ) : (
                <img
                  src={data.post.images[0]}
                  style={{ aspectRatio: 1, objectFit: "cover" }}
                />
              )}
            </div>
            <CardContent>
              <IconButton>
                {data.votes === 1 || data.votes > 1 ? (
                  <Favorite
                    sx={{ color: "red" }}
                    onClick={() => removeVote(data.post.id)}
                  />
                ) : (
                  <FavoriteBorder onClick={() => addVote(data.post.id)} />
                )}
              </IconButton>
              <MapsUgcRounded
                className="text-slate-600 cursor-pointer hover:opacity-70 hover:text-md"
                onClick={() => setShowCommentsPage(data.post)}
              />
              <Typography component="p">
                {data.votes !== 1 ? (
                  <p>{data.votes} likes</p>
                ) : data.votes === 0 ? (
                  <p>No likes</p>
                ) : (
                  <p>{data.votes} like</p>
                )}
              </Typography>
              <Typography variant="body2">
                <b>{data.post.owner.username}</b> &nbsp;
                {data.post.related_text.length > 20 ? (
                  <span className="text-sm">
                    {data.post.related_text.slice(0, 11)}&nbsp; more....
                  </span>
                ) : (
                  <span className="text-sm">{data.post.related_text}</span>
                )}
              </Typography>
              <p
                className="hidden md:block text-sm text-gray-400 cursor-pointer"
                onClick={() => setShowCommentsPage(data.post)}
              >
                {data.post.comments.length > 2 ? (
                  <p>view all {data.post.comments.length} comments</p>
                ) : data.post.comments.length === 0 ? (
                  <p>No comments</p>
                ) : (
                  <p>view {data.post.comments.length} comment</p>
                )}
              </p>
              <p
                className="text-sm text-gray-400 cursor-pointer md:hidden"
                onClick={() => navigate(`/comments/${data.post.id}`)}
              >
                {data.post.comments.length > 2 ? (
                  <p>view all {data.post.comments.length} comments</p>
                ) : data.post.comments.length === 0 ? (
                  <p>No comments</p>
                ) : (
                  <p>view {data.post.comments.length} comment</p>
                )}
              </p>
              {data.post.comments[0] && (
                <Typography variant="body2">
                  <b>commenter username</b> &nbsp;
                  {data.post.comments[0].comment.length > 20 ? (
                    <span className="text-sm">
                      {data.post.comments[0].comment.slice(0, 11)}&nbsp;....
                    </span>
                  ) : (
                    <span className="text-sm">
                      {data.post.comments[0].comment}
                    </span>
                  )}
                </Typography>
              )}
              {data.post.comments[1] && (
                <Typography variant="body2">
                  <b>commenter username</b> &nbsp;
                  {data.post.comments[1].comment.length > 20 ? (
                    <span className="text-sm">
                      {data.post.comments[1].comment.slice(0, 11)}&nbsp;....
                    </span>
                  ) : (
                    <span className="text-sm">
                      {data.post.comments[1].comment}
                    </span>
                  )}
                </Typography>
              )}
              <div className="hidden md:block flex">
                <input
                  placeholder="Add a comment..."
                  className="w-full text-black text-sm mt-2 outline-0 border-slate-500 border-b-2"
                  ref={inputRef}
                  onClick={() => setForced(true)}
                />
                {forced ? (
                  <p className="mt-8 text-red-500 text-sm ">Post</p>
                ) : (
                  ""
                )}
              </div>
            </CardContent>
          </CustomCard>
        </motion.div>
      )}
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

export default PostDetails;
