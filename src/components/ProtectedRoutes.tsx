import React from "react";
import { useAppSelector } from "../features/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const tokenn = useAppSelector((state) => state.user.accessToken);
  const location = useLocation();
  return tokenn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
