import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import { useAppSelector } from "../features/store";

// type Decoded = {
//   exp: number;
//   //when we decode jwt we would get more authentic info ,i just write one of them
// };

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  console.log("protected");
  useEffect(() => {
    let login = localStorage.getItem("simpleSocial");
    if (!login) {
      navigate("/login");
    }
  });

  return <Outlet />;
};

export default ProtectedRoutes;
