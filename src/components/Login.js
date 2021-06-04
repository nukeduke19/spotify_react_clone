import React from "react";
import "./login.css";
import { accessUrl } from "../spotify";

function Login(props) {
  return (
    <div className="background">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify logo"
      />
      <div className="button">
        <a href={accessUrl}>Login with spotify</a>
      </div>
    </div>
  );
}

export default Login;
