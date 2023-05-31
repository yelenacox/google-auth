import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import { createContext, useState } from "react";
import { Authorized } from "./authorized";

const CLIENT_ID =
  "993501719558-fr9dkh2v27pjtkke74og1p643apjq6qm.apps.googleusercontent.com";
export const myContext = createContext();

function App() {
  const currentUser = JSON.parse(localStorage.getItem("app_user"));

  const [user, setUser] = useState(currentUser ? currentUser : null);

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
