import { useContext, useEffect, useState } from "react";
import { myContext } from "./App";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { user, setUser } = useContext(myContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem("app_user");
    navigate("/login");
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = () => {
    fetch(
      "https://healthcare.googleapis.com/v1/projects/anvil-fhir-vumc/locations/us-central1/datasets/anvil-dev-test/fhirStores/anvil-studies/fhir",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/fhir+json; fhirVersion=4.0",
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1YmE5MzEzZmQ3YTdkNGFmYTg0ODg0YWJjYzg0MDMwMDQzNjMxODAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODYxNDg1MDEsImF1ZCI6Ijk5MzUwMTcxOTU1OC1mcjlka2gydjI3cGp0a2tlNzRvZzFwNjQzYXBqcTZxbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNDUzMDI2NjEzNTIyOTg4NzIxMCIsImVtYWlsIjoieWVsZW5hLmNveEB2dW1jLm9yZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI5OTM1MDE3MTk1NTgtZnI5ZGtoMnYyN3BqdGtrZTc0b2cxcDY0M2FwanE2cW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiWWVsZW5hIENveCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRkUmFhVFVNMFJveXE1YnE5YWxrZmxDd0Y0clU2ci1KcFhTZkxWTT1zOTYtYyIsImdpdmVuX25hbWUiOiJZZWxlbmEiLCJmYW1pbHlfbmFtZSI6IkNveCIsImlhdCI6MTY4NjE0ODgwMSwiZXhwIjoxNjg2MTUyNDAxLCJqdGkiOiIyZTU5MGJhMTFlMTk5ZjU3NmQxZjg3NzMxN2I5MWM1ZThjNGY1ZTY3In0.WpmxMtLc-o1GMyf3A2lQCfk7LYpuhBqkvz-cheW1XmDfpvAt8jTm3haaz82V9JBkVxaGvrkVtrDDH4yJHpYV_d_FIaOTRY1vNTH3J54U1NPKhwWG-YfoSeaqfOW6AeTh8YCWiY6R56TNmlEj2i4WDhGrE0SnilqODonb8KF4S0iKgJ6TWLD9wXm1A8GzvuaBkIweVlRr56xvnA4ep68u_Q7JRJXpCyiniv98aMJsNFXWGxbj5OE4QC35lHoEzNP7ipoGjJE0dmZEonrYpFrlnyMAS6nC0X7Lo9-l8IkmpUuofqVfKitHD7HOgNcu7bcl_YMHNu8_-4pW7CItHcO_hQ`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.entry);
      });
  };

  return (
    <>
      <div>
        <img src={user.picture} />
        <h3>{user.email}</h3>
      </div>
      <div>Yay! You're authenticated.</div>{" "}
      <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
    </>
  );
};
