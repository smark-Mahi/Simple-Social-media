import { NavLink,  useLocation } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import Add from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Createpostmodal from ".././Modals/Createpostmodal";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { useAppDispatch } from "../features/store";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../helpers/Tokens";
import { logout } from "../features/userSlice";
import { BsChatDots } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import Favorite from "@mui/icons-material/Favorite";
import { useAppSelector } from "../features/store";
import { getProfileApi } from "../api/loginauth";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.user);

  const toggle = () => setOpen((prevS) => !prevS);
  console.log(location.pathname, "location");

  // Functions
  function logoutHandler() {
    clearAuth();
    dispatch(logout());
    navigate("/login");
  }

  const activeLink = "text-black bg-white rounded-lg ";
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
          src={userProfile.data && userProfile.data.user.profile_photo}
          className="w-[25px] h-[25px] rounded-full"
          style={{ border: "1px solid black" }}
        />
      ),
      path: "/profile",
    },
    { name: "Logout", icon: <IoIosLogOut />, path: "/login" },
  ];
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="hidden lg:block fixed flex flex-col justify-between h-full border-r-2  bg-slate-500">
        <Stack spacing={3} direction="column">
          <div className=" mt-10 text-center">
            <h2 className="text-2xl font-base">𝓼𝓲𝓶𝓹𝓵𝓮 𝓼𝓸𝓬𝓲𝓪𝓵</h2>
          </div>
          <div className="px-2">
            <div className="flex font-semibold hover:bg-white hover:text-black justify-around h-[50px]  items-center rounded-lg ">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                <div className="flex h-[50px] w-60 justify-around items-center  hover:text-lg transition-all">
                  <Home /> <p>Home</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="px-2">
            <div className="flex hover:bg-white hover:text-black  font-semibold   justify-around h-[50px] items-center rounded-lg   ">
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                <div className="flex h-[50px] w-60 justify-around items-center hover:text-lg transition-all">
                  <img
                    src={
                      userProfile.data && userProfile.data.user.profile_photo
                    }
                    className="w-[25px] h-[25px] rounded-full"
                    style={{ border: "1px solid black" }}
                  />{" "}
                  <p>profile</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="px-2">
            <div
              className="flex px-2 hover:bg-white hover:text-black hover:text-lg transition-all font-semibold   justify-around h-[50px] items-center rounded-lg  cursor-pointer"
              onClick={toggle}
            >
              <div>
                <Add />
              </div>
              <div>create</div>
            </div>
          </div>
          <div className="px-2">
            <div className="flex font-semibold hover:bg-white hover:text-black justify-around h-[50px]  items-center rounded-lg ">
              <NavLink
                to="/chat"
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                <div className="flex h-[50px] w-60 justify-around items-center hover:text-lg transition-all">
                  <BsChatDots /> <p>Chat</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="px-2">
            <div className="flex font-semibold hover:bg-white hover:text-black justify-around h-[50px]  items-center rounded-lg ">
              <NavLink
                to="/notification"
                className={({ isActive }) => (isActive ? activeLink : "")}
              >
                <div className="flex h-[50px] w-60 ml-6 justify-around items-center hover:text-lg transition-all">
                  <AiOutlineHeart /> <p>Notifications</p>
                </div>
              </NavLink>
            </div>
          </div>
        </Stack>
        <div className="py-4 px-2">
          <div className="flex hover:bg-white hover:text-black  font-semibold   justify-around h-[50px] items-center rounded-lg   ">
            <div
              className="flex h-[50px] w-60 justify-around items-center hover:text-lg transition-all cursor-pointer"
              onClick={logoutHandler}
            >
              <div>
                <Logout className="text-customred-400" />
              </div>
              {auth.isAuth ? <p>logout</p> : <p>Login</p>}
            </div>
          </div>
        </div>
        {open && <Createpostmodal open={open} toggleModal={toggle} />}
      </div>
      <div className="block md:hidden lg:hidden fixed top-0 z-50 bg-white w-full h-12 flex justify-between items-center p-2 border-b-2">
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
