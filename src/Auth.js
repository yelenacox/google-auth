import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { myContext } from "./App";
import { redirect, useNavigate } from "react-router-dom";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function Auth({ children }) {
  const { user, setUser } = useContext(myContext);
  let navigate = useNavigate();

  function handleCallbackResponse(response) {
    var gUser = jwt_decode(response.credential);
    setUser(gUser);
    localStorage.setItem("app_user", JSON.stringify(gUser));
    navigate("/home");
  }

  useEffect(() => {
    if (!!user) {
      redirect("/home");
    }
    const google = window.google;
    google?.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, [user]);

  return (
    <div className="App">
      {user !== null ? children : <div id="signInDiv"></div>}
    </div>
  );
}

export default Auth;
