import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import { useAppSelector } from "../features/store";

// type Decoded = {
//   exp: number;
//   //when we decode jwt we would get more authentic info ,i just write one of them
// };

const ProtectedRoutes = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  console.log("protected");
=======
  // const auth = useAppSelector((state) => state.user);
  const navigate = useNavigate();

>>>>>>> 3e9bacf27f4c388cd82dc3be08038e94e3b2d8f2
  useEffect(() => {
    let login = localStorage.getItem("simpleSocial");
    if (!login) {
      navigate("/login");
<<<<<<< HEAD
=======
      // } else {
      //   const decoded: Decoded = jwtDecode(auth.accessToken);
      //   const currentTime = Date.now() / 1000;
      //   console.log(currentTime, "currenttime");
      //   if (decoded.exp < currentTime) {
      //     navigate("/login");
      //   }
>>>>>>> 3e9bacf27f4c388cd82dc3be08038e94e3b2d8f2
    }
  });

  return <Outlet />;
};

export default ProtectedRoutes;
