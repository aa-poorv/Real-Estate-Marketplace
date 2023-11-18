/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({ listing }) => {
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  return (
    <div className='flex flex-col bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer w-full sm:w-[330px] pb-1'>
      <Link
        to={`/listing/${listing._id}`}
        className='flex flex-col grow'
      >
        <div className='flex flex-col flex-1'>
          <img
            src={listing.imageURLs[0]}
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
            alt='Cover-Image'
          />
          <div className='flex flex-col gap-2 p-3 mt-2.5 w-full grow'>
            <p className='truncate text-lg font-semibold text-slate-700'>
              {listing.title}
            </p>
            <div className='flex items-center gap-1'>
              <MdLocationOn className='text-green-600 h-4 w-4' />
              <p className='text-sm text-gray-600 truncate w-full'>
                {listing.address}
              </p>
            </div>
            <div className='grow'>
              <p className='text-sm text-gray-700 line-clamp-2'>
                {listing.description}
              </p>
            </div>
            <p className='text-gray-500 font-semibold mt-2'>
              {listing.offer
                ? rupee.format(listing.discountPrice)
                : rupee.format(listing.regularPrice)}
              {listing.type === "rent" && " / month"}
            </p>
            <div className='flex gap-4 text-[13px] text-slate-700 font-bold'>
              <p>
                {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
              </p>
              <p>
                {listing.bathrooms} {listing.bathrooms > 1 ? "Baths" : "Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
