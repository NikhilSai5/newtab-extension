import React, { useState, useEffect } from "react";
import "./bg.css";
import axios from "axios";

const Background = () => {
  const [bgImageUrl, setBgImageUrl] = useState("");

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get(
          "https://pixabay.com/api/?key=17040018-9009ec2210656ee82db1ae269&min_width=1920&min_height=900&image_type=wallpaper"
        );

        if (response.status === 200) {
          const randomIndex = Math.floor(
            Math.random() * response.data.hits.length
          );
          const randomImageURL = response.data.hits[randomIndex].largeImageURL;
          setBgImageUrl(randomImageURL);
        } else {
          console.error("Failed to fetch image");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div
      className="bgImg"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    ></div>
  );
};

export default Background;
