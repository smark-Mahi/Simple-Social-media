import { NavLink, useLocation } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import Add from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Createpostmodal from ".././Modals/Createpostmodal";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../features/store";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../helpers/Tokens";
import { logout } from "../features/userSlice";
import { BsChatDots } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineHome,
  AiFillMessage,
} from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import Favorite from "@mui/icons-material/Favorite";
import { useAppSelector } from "../features/store";
import { getProfileApi } from "../api/loginauth";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SignUpContext } from "../Context/SignUPInfoContext";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isActiveLink, setIsActiveLink] = useState<string>("Home");
  const { notificationOpen, setNotificationOpen } = useContext(SignUpContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.user);
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

  const toggle = () => setOpen((prevS) => !prevS);
  console.log(location.pathname, "location");

  // Functions
  function logoutHandler() {
    clearAuth();
    dispatch(logout());
    navigate("/login");
  }

  function activeLink(path: string) {
    setIsActiveLink(path);
    return "text-black bg-slate-500 rounded-lg ";
  }

  console.log(auth, "u");
  const userProfile = useQuery({
    queryKey: ["profile", auth.id],
    queryFn: () => getProfileApi(auth.id),
  });

  const menus = [
    { name: "Home", icon: <AiOutlineHome />, path: "/" },
    { name: "Search", icon: <BsSearch />, path: "/search" },
    { name: "Chat", icon: <BsChatDots />, path: "/chat" },
    {
      name: "profile",
      icon: (
        <img
          src={userProfile.data && userProfile.data.User.profile_photo}
          className="w-[25px] h-[25px] rounded-full"
          style={{ border: "1px solid black" }}
        />
      ),
      path: "/profile",
    },
    {
      name: "Logout",
      icon: <IoIosLogOut />,
      path: "/login",
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <>
      <div
        className={`hidden  md:block fixed flex flex-col justify-between h-full border-r-[0.5px] border-slate-300   ${
          !notificationOpen && !(windowWidth <= 1025)
            ? ""
            : "w-24 transition-all ease-in-out duration-300 delay-150 "
        }`}
      >
        <Stack spacing={3} direction="column">
          <div
            className={` overflow-hidden ${
              !notificationOpen && !(windowWidth <= 1025)
                ? "mt-10 text-center"
                : "ml-8 mt-8 "
            } `}
          >
            {!notificationOpen && !(windowWidth <= 1025) ? (
              <motion.h2
                animate={{ y: 0 }}
                initial={{ y: "100%" }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-2xl font-base"
              >
                𝓼𝓲𝓶𝓹𝓵𝓮 𝓼𝓸𝓬𝓲𝓪𝓵
              </motion.h2>
            ) : (
              <motion.h2
                animate={{ y: 0 }}
                initial={{ y: "100%" }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-4xl font-base"
              >
                𝓼
              </motion.h2>
            )}
          </div>
          <div className="px-2">
            <div className="flex font-semibold hover:bg-slate-500 hover:text-black transition hover:duration-300 justify-around h-[50px]  items-center rounded-lg ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive && !notificationOpen ? activeLink("Home") : ""
                }
              >
                <div
                  className={`flex h-[50px] justify-around items-center  hover:text-lg ${
                    !notificationOpen && !(windowWidth <= 1025)
                      ? "w-52"
                      : "w-20  transition-all ease-in-out duration-300 delay-150"
                  }`}
                >
                  {!notificationOpen && isActiveLink === "Home" ? (
                    <Home />
                  ) : (
                    <AiOutlineHome className="text-2xl" />
                  )}

                  {!notificationOpen && !(windowWidth <= 1025) ? (
                    <div className=" w-28 flex justify-start">
                      {" "}
                      <p>Home</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </NavLink>
            </div>
          </div>
          <div className="px-2">
            <div
              className={`flex hover:text-black hover:bg-slate-500 transition hover:duration-300  font-semibold justify-around h-[50px] items-center rounded-lg 
                `}
            >
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive && !notificationOpen ? activeLink("Profile") : ""
                }
              >
                <div
                  className={`flex h-[50px] justify-around items-center hover:text-lg ${
                    !notificationOpen && !(windowWidth <= 1025)
                      ? "w-52"
                      : "w-20 transition-all ease-in-out duration-300 delay-150"
                  }`}
                >
                  <img
                    src={
                      userProfile.data && userProfile.data.User.profile_photo
                    }
                    className="w-[25px] h-[25px] rounded-full"
                    style={{ border: "1px solid black" }}
                  />{" "}
                  {!notificationOpen && !(windowWidth <= 1025) ? (
                    <div className=" w-28 flex justify-start">
                      <p>profile</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </NavLink>
            </div>
          </div>
          <div className="px-2">
            <div
              className="flex px-2 hover:bg-slate-500 hover:text-black transition hover:duration-300 hover:text-lg  font-semibold justify-around h-[50px] items-center rounded-lg  cursor-pointer"
              onClick={toggle}
            >
              <div>
                <Add className="text-2xl" />
              </div>
              {!notificationOpen && !(windowWidth <= 1025) ? (
                <div className=" w-28 flex justify-start">
                  <p>create</p>
                </div>
              ) : (
                " "
              )}
            </div>
          </div>
          <div className="px-2">
            <div
              className={`flex font-semibold hover:bg-slate-500 hover:text-black transition hover:duration-300 justify-around h-[50px]  items-center rounded-lg ${
                !(windowWidth <= 1025) ? "" : " "
              }`}
            >
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive && !notificationOpen ? activeLink("Chat") : ""
                }
              >
                <div
                  className={`flex h-[50px] justify-around items-center hover:text-lg ${
                    !notificationOpen && !(windowWidth <= 1025)
                      ? "w-52"
                      : "w-20 transition-all ease-in-out duration-300 delay-150"
                  }`}
                >
                  {!notificationOpen && isActiveLink === "Chat" ? (
                    <AiFillMessage className="text-2xl" />
                  ) : (
                    <BsChatDots className="text-2xl" />
                  )}
                  {!notificationOpen && !(windowWidth <= 1025) ? (
                    <div className=" w-28 flex justify-start">
                      {" "}
                      <p className="text-center">Messages</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </NavLink>
            </div>
          </div>
          <div className="px-2">
            <div
              className={`flex font-semibold cursor-pointer hover:text-black transition hover:bg-slate-500 hover:duration-300 justify-around h-[50px]  items-center rounded-lg ${
                !notificationOpen ? "" : "border-[0.5px] border-slate-300"
              }`}
            >
              <div onClick={() => setNotificationOpen((prev) => !prev)}>
                <div
                  className={`flex h-[50px]   items-center hover:text-lg  ${
                    !notificationOpen
                      ? "w-52 justify-around ml-6"
                      : "w-20 justify-center "
                  }`}
                >
                  {notificationOpen ? (
                    <AiFillHeart className="text-2xl  cursor-pointer" />
                  ) : (
                    <AiOutlineHeart className="text-2xl mr-8 cursor-pointer" />
                  )}
                  {!notificationOpen && !(windowWidth <= 1025) ? (
                    <div className="w-36 flex justify-start ">
                      <p>Notifications</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </Stack>
        <div className="py-4 px-2">
          <div className="flex hover:bg-slate-500 hover:text-black transition hover:duration-300  font-semibold   justify-around h-[50px] items-center rounded-lg   ">
            <div
              className={`flex h-[50px] justify-around items-center hover:text-lg  cursor-pointer ${
                !notificationOpen && !(windowWidth <= 1025) ? "w-52" : "w-20"
              }`}
              onClick={logoutHandler}
            >
              <div>
                <IoIosLogOut className="text-customred-400 text-2xl" />
              </div>
              {!notificationOpen && !(windowWidth <= 1025) ? (
                <div className=" w-28 flex justify-start">
                  {" "}
                  {auth.isAuth ? <p>logout</p> : <p>Login</p>}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {open && <Createpostmodal open={open} toggleModal={toggle} />}
      </div>
      <div className="block md:hidden lg:hidden fixed top-0 z-50  w-full flex justify-between items-center p-2 border-b-2 bg-white">
        <p className="text-slate-500 font-bold">𝓼𝓲𝓶𝓹𝓵𝓮 𝓼𝓸𝓬𝓲𝓪𝓵</p>
        <div className="flex justify-around items-center h-12 w-[70px]">
          <Add onClick={toggle} className="cursor-pointer" />
          <NavLink to="/notification" className="text-xl  cursor-pointer">
            {location.pathname === "/notification" ? (
              <Favorite sx={{ color: "red" }} />
            ) : (
              <AiOutlineHeart />
            )}
          </NavLink>
        </div>
      </div>
      <div className="block md:hidden lg:hidden max-h-[4.4rem] bg-white w-full  border-t-2  fixed bottom-0 left-0 z-50">
        <ul className="flex justify-between ">
          {menus.map((menu, i) => (
            <li className="w-14 list-none" key={i}>
              <a
                className="flex flex-col text-center pt-4 items-center"
                onClick={() => {
                  setActive(i);
                }}
              >
                {active === i && (
                  <span className="w-12 h-2 bg-slate-500 absolute top-0 rounded-b-xl"></span>
                )}
                <NavLink to={menu.path}>
                  <span
                    className={`text-xl cursor-pointer  duration-500 ${
                      active === i && "text-slate-500"
                    }`}
                  >
                    {menu.icon}
                  </span>
                  <span
                    className={`text-center text-xs ${
                      active === i
                        ? "translate-y-4 duration-400 opacity-100 text-slate-500"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {menu.name}
                  </span>
                </NavLink>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
