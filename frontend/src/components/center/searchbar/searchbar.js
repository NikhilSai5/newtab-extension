import React, { useState, useEffect } from "react";
import "./searchbar.css";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchEngine, setSearchEngine] = useState("google");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      let searchURL = "";
      if (searchEngine === "google") {
        searchURL = `https://www.google.com/search?q=${encodeURIComponent(
          searchQuery
        )}`;
      } else if (searchEngine === "youtube") {
        searchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(
          searchQuery
        )}`;
      }
      window.location.href = searchURL;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      handleSearch();
    }
  };

  const toggleSearchEngine = () => {
    setSearchEngine(searchEngine === "google" ? "youtube" : "google");
  };

  return (
    <div className="SearchbarContainer">
      <input
        className="searchInput"
        placeholder={`${
          searchEngine === "google" ? "Google" : "YouTube"
        } search`}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button className="searchBtn" onClick={handleSearch}>
        <img className="searchIcon" src="/search.png" />
      </button>
      <button onClick={toggleSearchEngine} className="exchangeBtn">
        <img src="/exchange.png" className="exchangeImg" />
      </button>
    </div>
  );
};

export default Searchbar;
