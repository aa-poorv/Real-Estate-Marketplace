/* eslint-disable react/prop-types */
import React from "react";
import "./flash.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";

const Flash = ({ classes, message, extraMessage }) => {
  let content;
  if (message === "Listing") {
    content = (
      <div
        className={`${classes} absolute h-fit p-3 w-60 shadow bg-neutral-400 top-0 left-0 right-0 mx-auto rounded-lg text-center text-white`}
      >
        <CheckCircleOutline /> New Listing Created
      </div>
    );
  } else if (message === "Success") {
    content = (
      <div
        className={`${classes} fixed h-12 p-3 w-60 shadow bg-green-400 top-0 left-0 right-0 mx-auto rounded-lg text-center text-white`}
      >
        <CheckCircleOutline /> Update Success
      </div>
    );
  } else if (message === "Error") {
    content = (
      <div
        className={`${classes} fixed h-fit p-3 w-64 shadow bg-red-400 top-0 left-0 right-0 mx-auto rounded-lg text-center text-white`}
      >
        <ErrorOutlineIcon /> {`Error: ${extraMessage}`}
      </div>
    );
  } else if (message === "Delete") {
    content = (
      <div
        className={`${classes} fixed h-12 p-3 w-60 shadow bg-yellow-400 top-0 left-0 right-0 mx-auto rounded-lg text-center text-white`}
      >
        <DeleteOutlineIcon /> {extraMessage}
      </div>
    );
  } else if (message === "Logout") {
    content = (
      <div
        className={`${classes} fixed h-fit p-3 w-60 shadow bg-teal-400 top-0 left-0 right-0 mx-auto rounded-lg text-center text-white`}
      >
        <LogoutIcon /> Logout Success. Come back soon!
      </div>
    );
  }
  return content;
};

export default Flash;
