import Header from "../../components/Header";
import Post from "../../components/Post";
import { useEffect, useState } from "react";

const Home = () => {
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

  return (
    <div>
      <Header />
      <div className=" fixed w-1/6 h-1/2 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob "></div>
      <div
        className={`relative md:mt-0 mt-12  ${
          windowWidth <= 380 ? "h-[660px] overflow-auto no-scrollbar" : "h-max "
        }`}
      >
        <Post />
      </div>
    </div>
  );
};

export default Home;
