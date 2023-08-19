import React, { createContext, useReducer } from "react";
import Mainpage from "./Mainpage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Logout from "./components/auth/logout";
import { initialState, reducer } from "../src/reducer/useReducer";

export const userContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/main" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </userContext.Provider>
    </>
  );
};

export default App;
