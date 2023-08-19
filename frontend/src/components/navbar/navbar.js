import React, { useState, useContext } from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../App";

const Navbar = ({ userData }) => {
  const { state, dispatch } = useContext(userContext);
  const RenderMenu = () => {
    if (userData || state) {
      return (
        <>
          <NavLink to="/logout">
            <button className="logoutBtn">logout</button>
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/login">
            <button className="loginBtn">Login</button>
          </NavLink>

          <NavLink to="/register">
            <button className="registerBtn">Register</button>
          </NavLink>
        </>
      );
    }
  };

  return (
    <div className="navbarContainer">
      <RenderMenu />
      <div className="LabelContainer">
        <label className="nameLabel">
          Hey, {userData ? userData.name : "Guest"}
        </label>
      </div>
    </div>
  );
};

export default Navbar;
