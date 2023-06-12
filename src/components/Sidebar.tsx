import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import Add from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Createpostmodal from ".././Modals/Createpostmodal";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { useAppDispatch } from "../features/store";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../helpers/Tokens";
import { logout } from "../features/userSlice";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggle = () => setOpen((prevS) => !prevS);
  console.log(location.pathname, "location");

  // Functions
  function logoutHandler() {
    clearAuth();
    dispatch(logout());
    navigate("/login");
  }

  const activeLink = "text-black bg-white rounded-lg ";
  return (
    <div className="fixed flex flex-col justify-between h-full border-r-2  w-52 bg-slate-500">
      <Stack spacing={4} direction="column" p={2}>
        <div className=" mt-10 text-center">
          <h2 className="text-2xl font-base">Simple social</h2>
        </div>
        <div>
          <div className="flex font-semibold hover:bg-white hover:text-black justify-around h-[50px]  items-center rounded-lg ">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              <div className="flex h-[50px] w-[170px] justify-around items-center hover:text-lg transition-all">
                <Home /> <p>Home</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div>
          <div className="flex hover:bg-white hover:text-black  font-semibold   justify-around h-[50px] items-center rounded-lg   ">
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              <div className="flex h-[50px] w-[170px] justify-around items-center hover:text-lg transition-all">
                <Avatar
                  alt="Travis Howard"
                  src="/"
                  sx={{ width: 24, height: 24 }}
                />{" "}
                <p>profile</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div
          className="flex hover:bg-white hover:text-black hover:text-lg transition-all font-semibold   justify-around h-[50px] items-center rounded-lg  cursor-pointer"
          onClick={toggle}
        >
          <div>
            <Add />
          </div>
          <div>create</div>
        </div>
      </Stack>
      <div className="py-4 px-5">
        <div className="flex hover:bg-white hover:text-black  font-semibold   justify-around h-[50px] items-center rounded-lg   ">
          <div
            className="flex h-[50px] w-[170px] justify-around items-center hover:text-lg transition-all cursor-pointer"
            onClick={logoutHandler}
          >
            <div>
              <Logout className="text-customred-400" />
            </div>
            <p>logout</p>
          </div>
        </div>
      </div>
      {open && <Createpostmodal open={open} toggleModal={toggle} />}
    </div>
  );
};

export default Sidebar;
