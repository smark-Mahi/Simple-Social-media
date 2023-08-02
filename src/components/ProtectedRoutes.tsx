import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// type Props = {
//   children: JSX.Element | JSX.Element[];
// };

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("simpleSocial");
    if (!login) {
      navigate("/login");
    }
  });

  return <Outlet />;
};

export default ProtectedRoutes;
