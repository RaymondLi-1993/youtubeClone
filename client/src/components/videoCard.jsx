import React from "react";

function VideoCard({ videos, onVideoSelect }) {
  return (
    <div
      onClick={() => {
        onVideoSelect(videos);
      }}
      className="w-36 p-1 m-auto sm:w-52 md:w-full md:p-4 cursor-pointer"
    >
      <img
        alt={videos.snippet.title}
        className="text-xs md:text-base"
        src={videos.snippet.thumbnails.medium.url}
      />
      <div className="text-xs md:text-base">
        <div className="">{videos.snippet.title}</div>
      </div>
    </div>
  );
}

export default VideoCard;
