import { useContext, useEffect, useState } from "react";
import { myContext } from "./App";
import { useNavigate } from "react-router-dom";

export const Authorized = () => {
  const { user, setUser } = useContext(myContext);
  const navigate = useNavigate();

  function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem("app_user");
    navigate("/login");
  }

  return (
    <>
      <div>
        <img src={user.picture} />
        <h3>{user.email}</h3>
      </div>
      <div>Yay! You're authorized.</div>{" "}
      <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
    </>
  );
};
