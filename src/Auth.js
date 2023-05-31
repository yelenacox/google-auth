import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { myContext } from "./App";
import { Navigate, redirect, useNavigate } from "react-router-dom";
const CLIENT_ID =
  "993501719558-fr9dkh2v27pjtkke74og1p643apjq6qm.apps.googleusercontent.com";

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
  console.log(user);

  //if we have a user: log out button
  //if we have no user: sign in button
  return (
    <div className="App">
      {user !== null ? (
        children
      ) : (
        // <>
        //   <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
        //   <div>
        //     <img src={user.picture} />
        //     <h3>{user.name}</h3>
        //   </div>
        // </>
        <div id="signInDiv"></div>
      )}
    </div>
  );
}

export default Auth;
