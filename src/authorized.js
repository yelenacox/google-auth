import { useContext } from "react";
import { myContext } from "./App";
import { useNavigate } from "react-router-dom";

export const Authorized = () => {
  const { user, setUser } = useContext(myContext);
  const navigate = useNavigate();
  function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem("app_user");
    navigate("/login");

    // document.getElementById("signInDiv").hidden = false;
  }
  return (
    <>
      <div>Yay! You're authorized.</div>{" "}
      <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
    </>
  );
};
