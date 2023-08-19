import React, { useState } from "react";
import "./register.css";
import Background from "../bg/Background";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = user;

    const response = await fetch(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Successfull Registration");
      console.log("Successfull Registration");

      navigate("/login");
    }
  };

  return (
    <>
      <Background />
      <div className="signupContainer">
        <h1 className="registerHeader">SignUp</h1>
        <form className="SignupForm" method="POST">
          <div className="formComponent">
            <label className="R" htmlFor="name">
              <i className="zmdi zmdi-account material-icon-name"></i>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={user.name}
              onChange={handleInputs}
              placeholder="Your name"
            ></input>
          </div>
          <div className="formComponent">
            <label className="R" htmlFor="email">
              <i className="zmdi zmdi-email material-icon-name"></i>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={user.email}
              onChange={handleInputs}
              placeholder="Your Email"
            ></input>
          </div>
          <div className="formComponent">
            <label className="R" htmlFor="password">
              <i className="zmdi zmdi-lock material-icon-name"></i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              value={user.password}
              onChange={handleInputs}
              placeholder="Password"
            ></input>
          </div>
          <div className="formComponent">
            <label className="R" htmlFor="confirmPassword">
              <i className="zmdi zmdi-lock material-icon-name"></i>
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="off"
              value={user.confirmPassword}
              onChange={handleInputs}
              placeholder="Confirm your password"
            ></input>
          </div>
          <input
            type="submit"
            name="signup"
            id="signup"
            className="RformSubmit"
            value="register"
            onClick={postData}
          />
        </form>

        <p className="ask_login">
          Already have an account?{" "}
          <NavLink to="/login" className="hyperlink">
            Login
          </NavLink>{" "}
        </p>
      </div>
    </>
  );
};

export default Register;
