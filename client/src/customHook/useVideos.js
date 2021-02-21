import { useState, useEffect } from "react";
import api from "../components/apis/api";
const KEY = `AIzaSyDbQIqoOlVAd_rZ6674qHri6ieJYAIQAus`;

let useVideos = defaultSearch => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    onFormSubmit(defaultSearch);
  }, [defaultSearch]);

  let onFormSubmit = async search => {
    let response = await api.get("/search", {
      params: {
        q: search,
        part: "snippet",
        type: "video",
        maxResults: 5,
        key: KEY,
      },
    });
    setVideos(response.data.items);
  };
  return [videos, onFormSubmit];
};

export default useVideos;
