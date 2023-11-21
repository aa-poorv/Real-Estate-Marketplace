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
        className={`${classes} fixed my-auto h-fit py-3 min-[475px]:py-1.5 w-full shadow bg-neutral-400 top-0 px-1 left-0 right-0 mx-auto text-center !leading-2 text-white`}
      >
        <CheckCircleOutline className='!h-auto !mb-[3.5px]' /> New Listing is
        Created
      </div>
    );
  } else if (message === "Success") {
    content = (
      <div
        className={`${classes} fixed my-auto h-fit py-3 min-[475px]:py-1.5 w-full shadow bg-green-400 top-0 px-1 left-0 right-0 mx-auto text-center !leading-2 text-white`}
      >
        <CheckCircleOutline className='!h-auto !mb-[3.5px]' /> {extraMessage}{" "}
        Updated Successfully.
      </div>
    );
  } else if (message === "Error") {
    content = (
      <div
        className={`${classes} fixed my-auto h-fit py-3 min-[475px]:py-1.5 w-full shadow bg-red-400 top-0 px-1 left-0 right-0 mx-auto text-center !leading-2 text-white`}
      >
        <ErrorOutlineIcon className='!h-auto !mb-[3.5px]' />{" "}
        {`Error: ${extraMessage}`}
      </div>
    );
  } else if (message === "Delete") {
    content = (
      <div
        className={`${classes} fixed my-auto h-fit py-3 min-[475px]:py-1.5 w-full shadow bg-yellow-400 top-0 px-1 left-0 right-0 mx-auto text-center !leading-2 text-white`}
      >
        <DeleteOutlineIcon className='!h-auto !mb-[3.5px]' /> {extraMessage}
      </div>
    );
  } else if (message === "Logout") {
    content = (
      <div
        className={`${classes} fixed my-auto h-fit py-3 min-[475px]:py-1.5 w-full shadow bg-teal-400 top-0 px-1 left-0 right-0 mx-auto text-center !leading-2 text-white`}
      >
        <LogoutIcon className='!h-auto !mb-[3.5px]' /> Logged out successfully.
        Come back soon!
      </div>
    );
  }
  return content;
};

export default Flash;
