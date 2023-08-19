import React, { useEffect, useState, useContext } from "react";
import Navbar from "./components/navbar/navbar";
import Background from "./components/bg/Background";
import Weather from "./components/navbar/weather";
import Time from "./components/center/time/time";
import Searchbar from "./components/center/searchbar/searchbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, useNavigate } from "react-router-dom";
import CalendarEvents from "./components/googleCalender/CalenderEvents";
import Todo from "./components/todo/Todo";

const queryClient = new QueryClient();

const Mainpage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const callMainPage = async () => {
    try {
      const res = await fetch("/main", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data);

      if (res.status !== 200) {
        console.log("Response status 200 but with error:", data.error);
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.log(" => Error:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callMainPage();
  }, []);

  return (
    <>
      <Navbar userData={userData} />
      <Background />
      <Weather />
      <Time />
      <Searchbar />
      <QueryClientProvider client={queryClient}>
        <Sidebar />
      </QueryClientProvider>
      <CalendarEvents />
      <Todo />
    </>
  );
};

export default Mainpage;
