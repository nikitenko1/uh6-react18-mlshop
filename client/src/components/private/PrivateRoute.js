import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser)
      return toast.error(
        "Users must be authenticated (by signing in) before they can access get to this page",
        {
          icon: "🔥", // Custom Icon
        }
      );
  }, []);

  if (!currentUser)
    return <Navigate to={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`} />;

  return <>{children}</>;
};

export default PrivateRoute;
