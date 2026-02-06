import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Data(cat = "", q = "") {
  const [videos, setVideos] = useState([]);
  const API_KEY = "54332000-1bc14590cbe1707edfe1f2579";

  useEffect(() => {
    axios
      .get("https://pixabay.com/api/videos/", {
        params: {
          key: API_KEY,
          category: cat,
          q:q,
          video_type: "film", 
          per_page: 200,
          editors_choice: true,
        },
      })
      .then((res) => {
        setVideos(res.data.hits);
      })
      .catch((err) => console.error("API Error:", err));

  }, [cat,q]); 

  return { videos };
}