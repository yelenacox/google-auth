import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import { createContext, useEffect, useState } from "react";
import { Home } from "./home";
import jwt_decode from "jwt-decode";

export const myContext = createContext();

function App() {
  const currentClient = localStorage.getItem("app_client")
    ? localStorage.getItem("app_client")
    : null;

  const [client, setClient] = useState(currentClient ? currentClient : null);

  return (
    <myContext.Provider
      value={{
        client,
        setClient,
      }}
    >
      {/* <Auth> */}
      <Routes>
        <Route path="*" element={<Auth />} />
        {/* <Route path="home" element={<Home />} /> */}
      </Routes>
      {/* </Auth> */}
    </myContext.Provider>
  );
}

export default App;
