import { useContext, useEffect, useState } from "react";
import { SignUpContext } from "../Context/SignUPInfoContext";
import { motion } from "framer-motion";

export default function Notification() {
  const { notificationOpen } = useContext(SignUpContext);
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
    <>
      {notificationOpen ? (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: windowWidth <= 1025 ? 300 : 300 }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
            type: "spring",
            mass: 1,
            damping: 8,
          }}
          exit={{ opacity: 0 }}
          className={`z-20 fixed top-0  h-screen  border-r-[0.5px] border-slate-300 bg-white overflow-auto p-2 ${
            windowWidth <= 1025 ? "" : "-ml-40"
          }`}
        >
          <p className="text-4xl font-semibold text-blue-900 ">Notications</p>
          <div className="mt-2 text-center text-blue-800">
            No Notification yet
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}
