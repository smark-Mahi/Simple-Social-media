import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useAppSelector } from "../features/store";

type Decoded = {
  exp: number;
  //when we decode jwt we would get more authentic info ,i just write one of them
};

const ProtectedRoutes = () => {
  const auth = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("simpleSocial");
    console.log(login, !login);
    if (login) {
      const decoded: Decoded = jwtDecode(auth.accessToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  });

  return <Outlet />;
};

export default ProtectedRoutes;
