import React from "react";
import "./CalenderEvents.css";

const CalenderEvents = () => {
  return (
    <>
      <div className="calenderContainer">
        <h4 className="calenderHeader">Calender Events</h4>
        <div className="calenderEventsContainer">
          <div className="eventComponent">
            <div className="eventsText">
              <p className="eventName">Event name</p>
              <p className="discription">Discription</p>
            </div>
            <div className="EventsTime">
              <p className="dayName">tuesday</p>
              <p className="eventDuration">8:30 - 9:30 AM</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderEvents;
