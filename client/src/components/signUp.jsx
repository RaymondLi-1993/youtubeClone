import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { createUser } from "../actions/index";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    await dispatch(createUser(data));
  };
  return (
    <div className=" w-96 h-2/5 m-auto">
      <div className="h-full mt-24 bg-gray-200 rounded-lg shadow-2xl m-auto max-w-sm lg:max-w-4xl">
        <div className="w-full h-full p-8 flex flex-col items-center">
          <h2 className="h-16 w-2/3 text-2xl font-Nunito font-semibold text-gray-700 text-center">
            Sign Up Today!
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
            <button className="bg-gray-700 text-white font-bold m-2 w-2/3 h-8 rounded mt-6 hover:bg-gray-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
