import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { fetchComments, postComments, deleteComment } from "../actions/index";
import Comment from "./comment";

const Comments = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const comments = useSelector(state => state.comments.data);
  const user = useSelector(state => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState(false);
  const [count, setCount] = useState(10);

  useEffect(() => {
    let loading = true;
    if (loading) {
      dispatch(fetchComments());
      setLoading(false);
    }
    return () => {
      loading = false;
    };
  }, [dispatch, newPost]);

  const onSubmit = async data => {
    let info;
    let userId = user.id;
    info = { ...data, userId };
    await dispatch(postComments(info));
    setNewPost(!newPost);
    reset();
  };

  const handleClick = id => {
    const intId = parseInt(id);
    const userId = user.id;
    const data = { intId, userId };
    dispatch(deleteComment(data));
  };

  let loadMore = () => {
    setCount(count + 5);
  };

  if (loading === false && comments.length > 0 && user) {
    return (
      <div className="w-7/12 mb-6 p-4 container lg:ml-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full h-2/5 items-start mb-12 mx-4 border-2 border-gray-300"
        >
          <input
            ref={register}
            name="post"
            className="w-2/3 h-8 m-2 p-2 focus:border-blue-400 rounded-md border-2"
            placeholder="post"
          ></input>
          <button
            style={{ style: `none` }}
            className="bg-gray-700 text-white font-bold w-32 h-12 rounded m-2 hover:bg-gray-600"
          >
            post
          </button>
        </form>
        {comments.slice(0, count).map(elem => {
          return (
            <Comment
              key={elem.id}
              handleClick={handleClick}
              user={user}
              {...elem}
            />
          );
        })}
        <div className="w-full h-8 mt-6 cursor-pointer">
          <button
            onClick={() => loadMore()}
            style={{ outline: `none` }}
            className="bg-yellow-400 text-black font-bold w-24 h-8 rounded m-2  hover:bg-yellow-500"
          >
            Load More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-7/12 mb-6 p-4 container lg:ml-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-2/5 items-start mb-12 mx-4 border-2 border-gray-300"
      >
        <input
          ref={register}
          name="post"
          className="w-2/3 h-8 m-2 p-2 focus:border-blue-400 rounded-md border-2"
          placeholder="post"
        ></input>
        <button className="bg-gray-700 text-white font-bold w-32 h-12 rounded m-2 hover:bg-gray-600">
          post
        </button>
      </form>
    </div>
  );
};

export default Comments;
