import { useContext, useEffect, useState } from "react";
import { myContext } from "./App";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function Auth({ children }) {
  const { client, setClient } = useContext(myContext);
  const [data, setData] = useState([]);

  let existingToken = localStorage.getItem("app_client");

  useEffect(() => {
    callFHIR();
  }, []);

  const callFHIR = async () => {
    const google = window.google;
    if (existingToken === null) {
      console.log("DOING STUFF because existing client is ", existingToken);
      let client = google?.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/cloud-platform",
        callback: (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            if (
              google.accounts.oauth2.hasGrantedAnyScope(
                tokenResponse,
                "https://www.googleapis.com/auth/cloud-platform"
              )
            ) {
              console.log("setting token response ", tokenResponse);
              localStorage.setItem(
                "app_client",
                tokenResponse.access_token.toString()
              );
              existingToken = tokenResponse;
            }
          }
        },
      });
      console.log("REQUESTING TOKEN FOR ", client);
      client.requestAccessToken();
    }
    if (existingToken) {
      fetch(
        "https://healthcare.googleapis.com/v1/projects/anvil-fhir-vumc/locations/us-central1/datasets/anvil-dev-test/fhirStores/anvil-studies/fhir",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/fhir+json; fhirVersion=4.0",
            Authorization: `Bearer ${existingToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((d) => {
          setData(d);
        });
    }
  };

  return data?.entry?.map((d) => <div>{d.resource?.title}</div>);
}

export default Auth;

//     }})
//     console.log("GETTING TOKEN FOR: ", client);

// const { user, setUser } = useContext(myContext);
// let navigate = useNavigate();

// function handleCallbackResponse(response) {
//   var gUser = jwt_decode(response.credential);
//   // console.log("not decoded: ", response);
//   console.log("decoded: ", jwt_decode(response.credential));
//   setUser(gUser);
//   localStorage.setItem("app_user", response.credential);
//   // console.log("token: ", response.credential);
//   navigate("/home");
// }
// const google = window.google;
// console.log("about to happen");
// let client = google?.accounts.oauth2.initTokenClient({
//   client_id: CLIENT_ID,
//   scope: "https://www.googleapis.com/auth/cloud-platform",
//   callback: handleCallbackResponse,
// });
// console.log("just happened");

// useEffect(() => {
//   console.log("useEffect console log");
//   if (!!user) {
//     redirect("/home");
//   }
//   client = google?.accounts.oauth2.initTokenClient({
//     client_id: CLIENT_ID,
//     scope: "https://www.googleapis.com/auth/cloud-platform",
//     callback: handleCallbackResponse,
//   });
//   console.log("CLIENT: ", client);
//   console.log("request access token: ", client.requestAccessToken);
//   // google?.accounts.id.initialize({
//   //   client_id: CLIENT_ID,
//   //   scope: "https://www.googleapis.com/auth/cloud-platform",
//   //   callback: handleCallbackResponse,
//   // });

//   // google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
//   //   theme: "outline",
//   //   size: "large",
//   // });
// }, [user]);

// console.log("client: ", client);
// return (
//   <div className="App">
//     {
//       user !== null ? (
//         children
//       ) : (
//         <button onclick={client.requestAccessToken()}>Authorize me</button>
//       )
//       // <div id="signInDiv"></div>
//     }
//   </div>
// );
