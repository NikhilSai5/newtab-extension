import React, { useContext, useState } from "react";
import Background from "../bg/Background";
import "./login.css";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
const Login = () => {
  const { state, dispatch } = useContext(userContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log(response);
    const data = await response.json();

    if (response.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("login successfull");
      navigate("/main");
    }
  };

  return (
    <>
      <Background />
      <div className="loginContainer">
        <h1 className="loginHeader">Login</h1>
        <form method="POST" className="loginForm">
          <div className="formComponent">
            <label className="L" htmlFor="email">
              <i className="zmdi zmdi-email material-icon-name"></i>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="formComponent">
            <label className="L" htmlFor="password">
              <i className="zmdi zmdi-lock material-icon-name"></i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <input
            type="submit"
            name="login"
            id="login"
            className="LformSubmit"
            value="Log in"
            onClick={loginUser}
          />
        </form>
        <p className="ask_login">
          Don't have an account?{" "}
          <NavLink to="/register" className="hyperlink">
            SignUp
          </NavLink>{" "}
        </p>
      </div>
    </>
  );
};

export default Login;
