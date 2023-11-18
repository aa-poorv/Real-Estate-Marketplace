import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getListingData } from "../utils/http";
import ErrorBlock from "../components/UI/ErrorBlock";
import { Link, useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaLocationDot,
  FaShare,
  FaSquareParking,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { TailSpin } from "react-loader-spinner";
import Contact from "../components/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  const {
    data,
    isPending: listingDataPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => getListingData({ id }),
  });

  const [messageBox, setMessageBox] = useState(false);

  const contactMessageHandler = () => {
    setMessageBox(true);
  };

  let RsCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(1050.55);

  let content;
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (listingDataPending) {
    content = (
      <div className='mt-24 flex justify-center'>
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

  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='Failed to load event'
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className='form-actions'>
          <Link
            to='../'
            className='button'
          >
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    const isContact = currentUser?._id !== data.userRef._id;
    content = (
      <>
        <Swiper navigation>
          {data.imageURLs.map((url) => (
            <SwiperSlide key={url}>
              <div
                className='h-[550px]'
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        >
          <FaShare className='text-slate-500' />
        </div>
        {copied && (
          <p className='fixed top-[13.5%] right-[7.5%] z-10 rounded-md bg-slate-100 p-2'>
            Link copied!
          </p>
        )}
        <div className='max-w-5xl mx-4 lg:mx-auto my-11 flex flex-col'>
          <h1 className='font-bold text-3xl underline'>
            {data.title} - {rupee.format(data.regularPrice)}
            {data.type === "rent" ? " / month" : ""}
          </h1>
          <div className='flex items-center mt-[23px] mb-2.5'>
            <span className='text-green-500'>
              <FaLocationDot />
            </span>
            <p className='text-slate-700 ml-3'>{data.address}</p>
          </div>
          <div className='flex gap-4 mb-3'>
            <p className='bg-red-800 p-1.5 w-full text-center max-w-[190px] rounded-md text-white'>
              {data.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            {data.offer && (
              <p className='bg-green-800 p-1.5 w-full text-center max-w-[190px] rounded-md text-white'>
                {rupee.format(+data.regularPrice - +data.discountPrice)} OFF
              </p>
            )}
          </div>
          <p className='text-slate-800'>
            <span className='font-semibold text-black'>Description</span> -{" "}
            {data.description}
          </p>
          <ul className='flex gap-4 sm:gap-6 text-green-900 font-semibold text-sm mt-2.5 items-center flex-wrap'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBed className='text-lg' />
              {data.bedrooms > 1
                ? `${data.bedrooms} beds`
                : `${data.bedrooms} bed`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBath className='text-lg' />
              {data.bathrooms > 1
                ? `${data.bathrooms} baths`
                : `${data.bathrooms} bath`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaSquareParking className='text-lg' />
              {data.parking ? "Parking" : "No Parking"}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaChair className='text-lg' />
              {data.furnished ? "Furnished" : "Unfurnished"}
            </li>
          </ul>
          <div
            className={`${messageBox ? "mt-4" : "mt-7"} ${
              isContact ? "mb-3.5" : ""
            }`}
          >
            {currentUser && isContact && !messageBox && (
              <button
                onClick={contactMessageHandler}
                className='w-full text-white bg-slate-700 uppercase p-3 rounded-md hover:opacity-95 disabled:opacity-80'
              >
                Contact Landlord
              </button>
            )}
            {messageBox && <Contact listingData={data} />}
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default Listing;
