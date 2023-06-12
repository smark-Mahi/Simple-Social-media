import axios from "axios";
import { axiosClient } from "../../api/auth";
import { getPostApi } from "../../api/loginauth";
import Header from "../../components/Header";
import Post from "../../components/Post";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const { data } = useQuery({
    queryKey: ["getdata"],
    queryFn: getPostApi,
  });
  console.log(data);
  return (
    <div className="relative">
      <Header />
      <Box className="fixed  w-1/6 h-1/2 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob "></Box>
      <Post />
    </div>
  );
};

export default Home;
