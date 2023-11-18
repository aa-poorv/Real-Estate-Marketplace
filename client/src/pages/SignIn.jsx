/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../utils/http";
import ErrorBlock from "../components/UI/ErrorBlock";
import { QueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const queryClient = new QueryClient();

function SignUp() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      dispatch(signInSuccess(data));
      navigate("/");
    },
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ formData });
  };

  return (
    <div className='p-3 max-w-lg mx-auto mt-7'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        <input
          type='text'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={isPending}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {isPending ? "Submitting..." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {isError && (
        <ErrorBlock
          title='Error signing in user'
          message={
            error?.message ||
            "Failed to create event.  Please check your inputs and try again later."
          }
        />
      )}
    </div>
  );
}

export default SignUp;
