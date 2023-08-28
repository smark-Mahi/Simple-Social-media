import Profileposts from "../../components/Profileposts";
import { useQueries } from "@tanstack/react-query";
import { getPostByUserIdApi, getProfileApi } from "../../api/loginauth";
import { useAppSelector } from "../../features/store";
import SkeletonProfile from "../../helpers/skeletons/SkeletonProfile";
import { motion } from "framer-motion";

const Profile = () => {
  const auth = useAppSelector((state) => state.user);

  const [userPosts, userProfile] = useQueries({
    queries: [
      {
        queryKey: ["specificprofile", auth.id],
        queryFn: () => getPostByUserIdApi(auth.id),
      },
      { queryKey: ["profile", auth.id], queryFn: () => getProfileApi(auth.id) },
    ],
  });

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, delay: 0.5 }}
      className="md:mt-0 h-max flex justify-center mt-16"
    >
      {userPosts.error || userProfile.error ? (
        <p>error</p>
      ) : !userPosts.data || !userProfile.data ? (
        <div className="w-full md:w-[70%] h-screen p-2 ">
          <SkeletonProfile />
        </div>
      ) : (
        <div className="w-full md:w-[70%] h-screen p-2 md:pt-10  md:ml-44">
          <div className="flex md:justify-evenly md:items-center  ">
            <div className="md:-mt-0 hidden md:block">
              <img
                alt="Remy Sharp"
                src={userProfile.data.User.profile_photo}
                className="border-2 rounded-full md:w-[150px] md:h-[150px] md:object-cover w-[150px] h-[150px]"
              />
            </div>
            <div className=" md:w-[60%] md:h-[150px] flex flex-col justify-between w-full">
              <div className="hidden md:block h-[50px] md:flex md:justify-start md:gap-12">
                <h6 className="text-2xl ">{userProfile.data.User.username}</h6>
                <button className="text-white w-24 h-10 rounded-md text-sm bg-slate-500 p-1">
                  Edit Profile
                </button>
              </div>
              <div className="block md:hidden flex justify-center gap-5 h-[70px]">
                <div className="md:hidden">
                  <img
                    alt="Remy Sharp"
                    src={userProfile.data.User.profile_photo}
                    className="border-2 rounded-full md:object-contain w-[50px] h-[50px]"
                  />
                </div>
                <div className="md:h-[50px] md:flex md:justify-start md:gap-12">
                  <h6 className="text-2xl ">{userProfile.data.Username}</h6>
                  <button className="bg-black mt-2 md:mt-0 rounded-md text-sm text-slate-500 p-1">
                    Edit Profile
                  </button>
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
                  <div className="absolute top-5 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 "></div>
                </div>
                <div className="md:order-last">
                  <p>{userProfile.data.User.about}</p>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="show"
            className="mt-12 md:h-[820px] md:overflow-auto md:no-scrollbar relative"
          >
            <Profileposts posts={userPosts.data.data} />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
