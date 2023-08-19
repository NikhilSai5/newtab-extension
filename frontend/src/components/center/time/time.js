import React, { useState, useEffect } from "react";
import "./time.css";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  return (
    <div className="timeContainer">
      <span className="timeText">
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}
      </span>
      <span className="SecondsText">
        {seconds < 10 ? "0" + seconds + "s" : seconds + "s"}
      </span>
    </div>
  );
};

export default Time;
