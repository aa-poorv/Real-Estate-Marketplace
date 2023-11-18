/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listingData }) => {
  const [message, setMessage] = useState("");
  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };
  return (
    <>
      <p className='m-1'>
        Contact{" "}
        <span className='font-semibold '>{listingData.userRef.username}</span>{" "}
        for <span className='font-semibold'>{listingData.title}</span>{" "}
      </p>
      <textarea
        type='text'
        placeholder='Enter your message...'
        value={message}
        onChange={messageChangeHandler}
        id='message'
        className='w-full p-3 border rounded-lg'
        rows={2}
      />
      <Link
        to={`mailto:${listingData.userRef.email}?subject=Regarding ${listingData.title}&body=${message}`}
        className='w-full inline-block bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
      >
        Send Message
      </Link>
    </>
  );
};

export default Contact;
