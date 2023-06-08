import React from "react";

const Auth = ({ children }) => {
  //this will be auth context
  //validate token and return children or redirect to login and clear user
  return children;
};

export default Auth;
