import { useParams } from "react-router-dom";
import { getPostByUserIdApi, getProfileApi } from "../../api/loginauth";
import { useQueries } from "@tanstack/react-query";
import Profileposts from "../../components/Profileposts";
import { Box } from "@mui/material";
import { useAppSelector } from "../../features/store";
import { useState } from "react";
import SkeletonProfile from "../../helpers/skeletons/SkeletonProfile";

export default function AllUsersProfile() {
  const params = useParams();
  const id = +(params.id ?? 0);
  const auth = useAppSelector((state) => state.user);
  const [idd, setIdd] = useState(0);
  const [userPosts, userProfile] = useQueries({
    queries: [
      {
        queryKey: ["specificprofile", id],
        queryFn: () => getPostByUserIdApi(id),
      },
      { queryKey: ["profile", id], queryFn: () => getProfileApi(id) },
    ],
  });
  console.log(userPosts.data, "datas");
  console.log(userProfile.data, "profile");

  // const followUser = async () => {
  //   await followUserApi(id);
  //   await queryClient.invalidateQueries(["profile", id]);
  // };

  console.log(idd, "id");
  return (
    <div className="h-screen">
      <div className="md:mt-0 h-max flex justify-center mt-16 ">
        {userPosts.error || userProfile.error ? (
          <p>error</p>
        ) : !userPosts.data || !userProfile.data ? (
          <div className="w-full md:w-[70%] h-screen p-2 ">
            <SkeletonProfile />
          </div>
        ) : (
          <div className="w-full md:w-[70%]  p-2 md:pt-10  ">
            <div className="flex md:justify-evenly md:items-center md:justify-around  ">
              <div className="md:-mt-0 hidden md:block">
                {/* <button
                  className="text-white w-24 h-10 rounded-md text-md bg-slate-500 p-1 cursor-pointer"
                  onClick={followUser}
                >
                  Follow
                </button> */}
                <img
                  alt="Remy Sharp"
                  src={userProfile.data.user.profile_photo}
                  className="border-2 rounded-full md:w-[150px] md:h-[150px] w-[50px] h-[50px]"
                />
              </div>
              <div className=" md:w-[60%] md:h-[150px] flex flex-col justify-between w-full">
                <div className="hidden md:block h-[50px] md:flex md:justify-start md:gap-2">
                  <h6 className="text-2xl">{userProfile.data.user.username}</h6>
                  <button className="text-white w-24 h-10 rounded-md text-sm bg-slate-500 p-1 cursor-pointer">
                    Edit Profile
                  </button>
                  {!(auth.id === id) && (
                    <button
                      className="text-white w-24 h-10 rounded-md text-md bg-slate-500 p-1 cursor-pointer"
                      onClick={() => setIdd(userProfile.data.user.id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
                <div className="block md:hidden flex justify-center gap-5 h-[70px]">
                  <div className="md:hidden">
                    <img
                      alt="Remy Sharp"
                      src={userProfile.data.user.profile_photo}
                      className="border-2 rounded-full md:w-[150px] md:h-[150px] w-[50px] h-[50px]"
                    />
                  </div>
                  <div className="md:h-[50px] md:flex md:justify-start md:gap-12">
                    <h6 className="text-2xl ">
                      {userProfile.data.user.username}
                    </h6>
                    <button className="bg-black mt-2 md:mt-0 rounded-md text-sm text-slate-500 p-1 cursor-pointer">
                      Edit Profile
                    </button>
                    {!(auth.id === id) && (
                      <button
                        className="text-white w-16 rounded-md text-sm bg-slate-500 p-1 ml-1 cursor-pointer"
                        onClick={() => setIdd(userProfile.data.user.id)}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
                <div className=" bg-white md:h-[100px] flex flex-col justify-around ">
                  <div className="flex justify-around md:flex md:justify-around order-last border-y-2 p-2 md:p-0 md:border-y-0 md:block md:mt-0 mt-4 ">
                    <h4>
                      {userPosts.data.data.length}{" "}
                      <span className="font-bold">posts</span>
                    </h4>
                    <h4>
                      {userProfile.data.followers_count}{" "}
                      <span className="font-bold">followers</span>
                    </h4>
                    <h4>
                      {userProfile.data.following_count}{" "}
                      <span className="font-bold">following</span>
                    </h4>
                    <Box className="absolute top-5 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 "></Box>
                  </div>
                  <div className="md:order-last">
                    <p>{userProfile.data.about}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 md:h-[370px] md:overflow-auto md:no-scrollbar">
              <Profileposts posts={userPosts.data.data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
