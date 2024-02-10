import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  addCommentsApi,
  getAllCommentsById,
  getProfileApi,
} from "../../api/loginauth";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../features/store";
import { motion } from "framer-motion";

export default function Comments() {
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id ?? 0);
  const queryClient = useQueryClient();
  const auth = useAppSelector((state) => state.user);
  const [addComment, setAddComment] = useState<string>("");

  const { data, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getAllCommentsById(id),
  });

  const userProfile = useQuery({
    queryKey: ["profile", auth.id],
    queryFn: () => getProfileApi(auth.id),
  });

  const addComments = async () => {
    await addCommentsApi({ post_id: id, comment: addComment });
    await queryClient.invalidateQueries(["comments"]);
    setAddComment("");
  };
  console.log(userProfile?.data, "data");
  return (
    <>
      {error && userProfile.error ? (
        <p>error</p>
      ) : !data && !userProfile.data ? (
        <p>loading...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          className="mt-16  h-screen bg-slate-500 flex flex-col"
        >
          <div className="">
            <KeyboardArrowLeftIcon
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            <p className="text-center -mt-6">Comments</p>
          </div>
          <div className="bg-white h-14 p-2 flex gap-4 justify-center items-center">
            <img
              src={userProfile.data?.user?.profile_photo}
              alt="i"
              className="w-[25px] h-[25px] rounded-full"
              style={{ border: "1px solid black" }}
            />
            <div className="flex justify-between bg-slate-500 w-64 items-center p-2 h-[40px] rounded-full">
              <input
                className="text-sm m-2 outline-0 w-32 bg-transparent mt-2 border-0 "
                placeholder="Add a comment..."
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
              />
              <p
                onClick={addComments}
                className="text-red-500 text-md cursor-pointer "
              >
                Post
              </p>
            </div>
          </div>

          <div className="p-2 overflow-auto no-scrollbar h-[450px]">
            {data && data.length !== 0 ? (
              <>
                {data.map((comment: any) => (
                  <Typography variant="body2" className="p-2 flex gap-2">
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
              </>
            ) : (
              <p className="text-center">No Comments Are Found</p>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
