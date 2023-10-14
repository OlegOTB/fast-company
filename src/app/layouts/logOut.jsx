import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
const LogOut = () => {
  const { logOt } = useAuth();
  useEffect(() => {
    logOt();
  }, []);
  return <h1>Loading...</h1>;
};

export default LogOut;
