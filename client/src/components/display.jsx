import React from "react";

function Display({ selected }) {
  if (!selected) {
    return (
      <div>
        <h1></h1>
      </div>
    );
  }
  return (
    <div className="w-full h-80 md:h-96">
      <iframe
        title={`display`}
        className="h-52 m-auto p-4 sm:w-2/3 md:w-10/12 md:h-96"
        src={`https://www.youtube.com/embed/${selected.id.videoId}`}
        allowFullScreen
      ></iframe>

      <div className="p-2 h-26 w-full">
        <h4 className="text-xs w-9/12 m-auto md:text-base md:w-10/12">
          {selected.snippet.title}{" "}
        </h4>
        <p className="text-xs w-9/12 m-auto md:text-base md:w-10/12">
          {selected.snippet.description}
        </p>
      </div>
    </div>
  );
}

export default Display;
