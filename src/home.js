import { useContext, useEffect, useState } from "react";
import { myContext } from "./App";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { client, setClient } = useContext(myContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function handleSignOut(event) {
    setClient(null);
    localStorage.removeItem("app_client");
    navigate("/login");
  }

  let existingToken = localStorage.getItem("app_client");
  useEffect(() => {
    if (data.length < 1 && existingToken) {
      callFHIR();
    }
  }, []);

  const callFHIR = () => {
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
  };

  return (
    <>
      <div>{data?.entry?.map((d) => d?.resource?.title)}.</div>{" "}
      <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
    </>
  );
};
