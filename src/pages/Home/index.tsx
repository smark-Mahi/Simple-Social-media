import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthorizePosts from "../../components/AuthorizePosts";
import { useAppSelector } from "../../features/store";
import UnAuthorizePosts from "../../components/UnAuthorizePosts";
import { getAuth } from "../../helpers/Tokens";

const Home = () => {
  const auth = useAppSelector((state) => state.user);
  let login = localStorage.getItem("simpleSocial");

  const [windowWidth, setWindoWidth] = useState(window.innerWidth);

  const handleWindowWidth = () => {
    setWindoWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidth);

    return () => {
      window.removeEventListener("resize", handleWindowWidth);
    };
  }, [windowWidth]);
  console.log(login, "homeauth");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <div
        className={` fixed w-1/6 h-1/2 bg-purple-200 md:bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-80   ${
          windowWidth <= 380 ? "animate-blob ml-24" : "ml-[680px] -mt-12"
        }`}
      ></div>
      <div
        className={`relative md:mt-0 mt-12 ${
          windowWidth <= 380 ? "h-[660px] overflow-auto no-scrollbar" : "h-max"
        }`}
      >
        {login ? <AuthorizePosts /> : <UnAuthorizePosts />}
      </div>
    </motion.div>
  );
};

export default Home;
