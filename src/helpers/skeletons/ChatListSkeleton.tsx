import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

export default function ChatListSkeleton() {
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
    <div className="border-solid border-b-[0.5px] border-slate-200 w-full flex justify-around">
      <div>
        <Skeleton classes="profile-circle width-50" />
      </div>

      {windowWidth >= 900 || windowWidth <= 640 ? (
        <div className="flex flex-col w-full md:ml-2">
          <Skeleton classes="text width-20" />
          <Skeleton classes="text width-10" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
