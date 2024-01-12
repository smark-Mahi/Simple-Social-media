import { useParams } from "react-router-dom";
import { Messages } from "../Chat";
import { useEffect, useState } from "react";

const MobileChatPage = () => {
  const params = useParams();
  const id = +(params.id ?? 0);

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

  console.log(id, "params");
  return (
    <div className={`h-[500px] mt-12 ${windowWidth <= 380 ? "h-[620px]" : ""}`}>
      <Messages id={id} />
    </div>
  );
};

export default MobileChatPage;
