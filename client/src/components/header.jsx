import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../actions/index";

import { Film, UserIcon } from "./icons/icons";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user) || null;

  const handleClick = event => {
    event.stopPropagation();
    dispatch(signOut());
  };

  return (
    <div className="w-full h-16 bg-gray-800">
      <div className="bg-gray-800 w-full h-full flex items-center justify-evenly container m-auto p-4">
        <Film />
        <div className="text-white w-1/3 text-xs md:text-base text-center">
          {user ? `HELLO ${user.username}`.toUpperCase() : null}
        </div>
        {user ? (
          <div className="text-white w-1/3 text-xs md:text-base flex justify-center">
            <UserIcon />
            <button
              style={{ outline: `none` }}
              onClick={event => handleClick(event)}
            >
              LOGOUT
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
