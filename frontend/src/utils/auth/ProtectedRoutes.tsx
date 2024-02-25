import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import useUserData from "@/hooks/useUserData";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      navigate(ROUTES.home);
    }
  }, [user, navigate]);

  return children;
}
export default PrivateRoute;
