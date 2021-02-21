import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { signIn, demoRoute } from "../actions/index";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(state => state.error.message);

  const onSubmit = data => {
    dispatch(signIn(data));
  };

  const handleClick = (username = "demo") => {
    const data = { username };
    dispatch(demoRoute(data));
  };

  return (
    <div className=" w-96 h-3/5 m-auto">
      <div className="h-full mt-24 bg-gray-200 rounded-lg shadow-2xl m-auto max-w-sm lg:max-w-4xl">
        <div className="w-full h-full p-8 flex flex-col items-center">
          <h2 className="h-16 w-1/3 text-2xl font-Nunito font-semibold text-gray-700 text-center">
            Login
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full h-2/5 items-center"
          >
            <input
              ref={register}
              name="username"
              className="w-2/3 h-8 m-2 p-2 focus:border-blue-400 rounded-md"
              placeholder="username"
              required
            ></input>
            <input
              ref={register}
              name="password"
              className="w-2/3 h-8 m-2 p-2 focus:border-blue-400 rounded-md"
              placeholder="password"
              required
            ></input>
            <div className="text-red-600 text-xs h-0 w-2/3 mb-2">
              {error.errors ? `${error.errors}` : null}
            </div>
            <button className="bg-gray-700 text-white font-bold m-2 w-2/3 h-8 rounded mt-6 hover:bg-gray-600">
              Login
            </button>
          </form>
          <div className="flex w-full h-0 items-center justify-evenly mt-4">
            <div className="w-1/3 border-t border-2 border-gray-400  "></div>
            <span className="h-0 mb-6 text-gray-400">or</span>
            <div className="w-1/3 border-t border-2 border-gray-400  "></div>
          </div>
          <div className="mt-4 w-full flex justify-center h-12">
            <button
              onClick={() => {
                handleClick();
              }}
              className=" text-black bg-yellow-500 font-bold m-2 w-2/3 rounded hover:bg-yellow-400"
            >
              Demo Login
            </button>
          </div>
          <div className="mt-4">
            <h1 className="text-sm">Don't have an account?</h1>
            <Link
              to="/signup"
              className="text-xs underline text-blue-500 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
