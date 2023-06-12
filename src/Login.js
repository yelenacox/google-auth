import { useContext, useState } from "react";
import { myContext } from "./App";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function Login({ children }) {
  const { client, setClient } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let existingToken = localStorage.getItem("app_client");

  const callbackResponse = (tokenResponse) => {
    //this only happens if the token response exists and contains an access token
    if (tokenResponse && tokenResponse.access_token) {
      if (
        google.accounts.oauth2.hasGrantedAnyScope(
          tokenResponse,
          "https://www.googleapis.com/auth/cloud-platform",
          "https://www.googleapis.com/auth/userinfo.profile"
        )
      ) {
        localStorage.setItem(
          "app_client",
          tokenResponse.access_token.toString()
        );
        existingToken = tokenResponse;
      }
    }
    setLoading(false);
    navigate("/");
  };

  const handleSignIn = () => {
    const google = window.google;
    if (existingToken === null) {
      let client = google?.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope:
          "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/userinfo.profile",
        callback: callbackResponse(),
      });
      setLoading(true);
      client.requestAccessToken();
    }
  };

  function handleSignOut(event) {
    setClient(null);
    localStorage.removeItem("app_client");
    navigate("/login");
  }

  return (
    <div>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
    </div>
  );
}

export default Login;
