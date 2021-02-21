import React, { useState } from "react";

let Input = ({ onFormSubmit }) => {
  const [search, setSearch] = useState(``);

  let handleSubmit = async event => {
    event.preventDefault();

    await onFormSubmit(search);
    setSearch(``);
  };

  return (
    <div className="w-full h-16">
      <form
        className="w-full h-full flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-6/12 h-8 p-2 border-2 border-gray-400 rounded-lg"
          style={{ outline: `none` }}
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search"
        ></input>
      </form>
    </div>
  );
};

export default Input;
