import React, { useEffect, useState } from "react";
import Input from "../components/input";
import List from "../components/video-list";
import Display from "../components/display";
import useVideos from "../customHook/useVideos";
import Comments from "./comments";

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, onFormSubmit] = useVideos(`golden buzzer Americas got talent`);

  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);

  let onVideoSelect = video => {
    setSelectedVideo(video);
  };

  return (
    <div className="w-full">
      <Input onFormSubmit={onFormSubmit} />
      <div className="w-full flex flex-col md:flex-row md:relative">
        <div className="w-full md:w-2/3 md:h-52">
          <Display selected={selectedVideo} />
        </div>
        <div className="w-full md:w-1/3 md:absolute md:right-6">
          <List onVideoSelect={onVideoSelect} videos={videos} />
        </div>
      </div>
      <div className="invisible md:visible w-full mt-72">
        <Comments />
      </div>
    </div>
  );
};

export default Videos;
