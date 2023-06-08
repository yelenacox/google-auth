import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import { createContext, useEffect, useState } from "react";
import { Home } from "./home";
import Auth from "./Auth";
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
      <Auth>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Auth>
    </myContext.Provider>
  );
}

export default App;
