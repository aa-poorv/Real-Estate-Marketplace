/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userListings } from "../utils/http";
import { TailSpin } from "react-loader-spinner";
import ErrorBlock from "./UI/ErrorBlock";
import { Link, useNavigate } from "react-router-dom";

const UserListings = ({ currentUser, openConfirmHandler }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", "listing", currentUser._id],
    queryFn: userListings,
  });

  const navigationHanler = ({ id }) => {
    navigate(`/listing/${id}`);
  };

  let content;

  if (isLoading) {
    content = (
      <div className='flex justify-center mt-5'>
        <TailSpin
          height='80'
          width='80'
          color='black'
          ariaLabel='tail-spin-loading'
          radius='2'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={
          error.info?.message === "jwt expired"
            ? "Session Expired Sign in again"
            : error.info.message || "Failed to fetch events"
        }
      />
    );
  }

  if (data && data.length > 0) {
    content = (
      <>
        <div className='mb-11'>
          <h1 className='text-3xl font-semibold text-center my-7'>
            Your listings
          </h1>
          <div className='flex gap-2 px-2 justify-center sm:justify-between flex-wrap'>
            {data.map((listing) => (
              <div
                key={listing._id}
                className='flex flex-col border border-gray-400 rounded-lg shadow-lg hover:shadow-xl overflow-hidden'
                style={{ flexBasis: "232px" }}
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageURLs[0]}
                    alt='listing cover photo'
                    className='w-screen rounded-t-lg cursor-pointer hover:scale-105 transition-scale duration-300'
                    style={{ height: "8.4rem" }}
                  />
                </Link>
                <p
                  className='my-4 grow text-center px-[1.11rem] hover:underline cursor-pointer line-clamp-2'
                  onClick={() => navigationHanler({ id: listing._id })}
                >
                  {listing.title}
                </p>

                <div className='flex justify-around mb-7 px-4'>
                  <span
                    className='text-red-700 cursor-pointer hover:opacity-90'
                    onClick={() => openConfirmHandler({ id: listing._id })}
                  >
                    Delete
                  </span>
                  <Link to={`/update-listing/${listing._id}`}>
                    <span className='text-green-700 cursor-pointer hover:opacity-90'>
                      Edit
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (data && data.length === 0) {
    content = (
      <div className='flex justify-center text-lg text-gray-500 font-medium mt-4 mb-5'>
        <span>You have no Listing!!</span>
      </div>
    );
  }

  return content;
};

export default UserListings;
