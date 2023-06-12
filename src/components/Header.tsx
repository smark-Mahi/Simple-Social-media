import React from "react";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  return (
    <div className="bg-base-100 flex h-[60px] justify-end gap-5 items-center border-b-2 border-slate-400 rounded-b-3xl sticky top-0 z-30 opacity-75">
        <div className="relative text-gray-600 focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
      <input type="search"  className="w-[400px] py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 " placeholder="Search..." />
    </div>
      <Avatar alt="Travis Howard" src="/" sx={{ marginRight: "10px" }} />
    </div>
  );
};

export default Header;
