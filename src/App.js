import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import { createContext, useEffect, useState } from "react";
import { Authorized } from "./home";
import jwt_decode from "jwt-decode";

export const myContext = createContext();

function App() {
  const currentUser = localStorage.getItem("app_user")
    ? localStorage.getItem("app_user")
    : null;

  const [user, setUser] = useState(
    currentUser ? jwt_decode(currentUser) : null
  );

  return (
    <myContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Auth>
        <Routes>
          <Route path="login" element={<Auth />} />
          <Route path="home" element={<Authorized />} />
        </Routes>
      </Auth>
    </myContext.Provider>
  );
}

export default App;
