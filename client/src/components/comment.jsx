import React from "react";

import { UserIcon } from "./icons/icons";

const Comment = ({ username, comments, id, handleClick, user }) => {
  return (
    <div className="flex items-center w-full h-12 m-4">
      <UserIcon />
      <div className="w-full h-full px-4">
        <div className=" font-openSans font-bold">{username}</div>
        <div className="flex items-center justify-between w-full h-6/12 border-b-4">
          <div>{comments}</div>
          {user.username === username ? (
            <button
              id={id}
              style={{ style: `none` }}
              onClick={event => {
                handleClick(event.target.id);
              }}
            >
              X
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
