import React, { useState, useEffect } from "react";
import VideoCard from "./videoCard";

let List = ({ videos, onVideoSelect }) => {
  return (
    <div className="w-full grid grid-cols-2 p-2 m-1 content-center md:flex md:flex-col md:p-0 md:w-3/4">
      {videos.map(elem => {
        return (
          <VideoCard
            key={elem.id.videoId}
            onVideoSelect={onVideoSelect}
            videos={elem}
          />
        );
      })}
    </div>
  );
};

export default List;
