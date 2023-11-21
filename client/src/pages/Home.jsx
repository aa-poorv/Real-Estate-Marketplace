import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
import { queryListings } from "../utils/http";
import { Navigation } from "swiper/modules";
import { FaGithub, FaHackerrank, FaLinkedin } from "react-icons/fa";
import { SiCodechef, SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { CiMail } from "react-icons/ci";
import ListingCarousel from "../components/ListingCarousel";
import { MdLocationOn } from "react-icons/md";

function Home() {
  SwiperCore.use([Navigation]);
  const { data: offerListings } = useQuery({
    queryKey: ["listings", { offer: true }],
    queryFn: () =>
      queryListings({ queryString: "offer=true&limit=6", pageParam: 1 }),
  });

  const { data: rentalListings } = useQuery({
    queryKey: ["listings", { rental: true }],
    queryFn: () =>
      queryListings({ queryString: "type=rent&limit=6", pageParam: 1 }),
  });

  const { data: saleListings } = useQuery({
    queryKey: ["listing", { sale: true }],
    queryFn: () =>
      queryListings({ queryString: "type=sell&limit=6", pageParam: 1 }),
  });

  return (
    <div>
      {/* top*/}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Raj Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of property for you to choose from
        </div>
        <Link
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
          to={"/search"}
        >
          {"Let's get started..."}
        </Link>
      </div>
      {/* swiper*/}

      {offerListings && offerListings.length > 0 && (
        <Swiper navigation>
          {offerListings.map((listing) => (
            <SwiperSlide key={listing.imageURLs[0]}>
              <div
                className='h-[500px]'
                style={{
                  background: `url(${listing.imageURLs[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 mt-10 mb-14'>
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent <span className='text-slate-500'>offers</span>
              </h2>
              <Link
                to={"/search?offer=true"}
                className='text-sm text-blue-800 hover:underline'
              >
                Show more offers
              </Link>
            </div>
            <ListingCarousel listings={offerListings} />
          </div>
        )}
        {rentalListings && rentalListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for <span className='text-slate-500'>rent</span>
              </h2>
              <Link
                to={"/search?type=rent"}
                className='text-sm text-blue-800 hover:underline'
              >
                Show more places for rent
              </Link>
            </div>
            <ListingCarousel listings={rentalListings} />
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for <span className='text-slate-500'>sale</span>
              </h2>
              <Link
                to={"/search?type=sell"}
                className='text-sm text-blue-800 hover:underline'
              >
                Show more places for sale
              </Link>
            </div>
            <ListingCarousel listings={saleListings} />
          </div>
        )}
      </div>
      {/* footer */}
      {saleListings && (
        <div className='bg-zinc-900'>
          <div className='flex flex-col sm:flex-row max-w-6xl mx-auto text-white justify-between px-3 py-16'>
            <div className='flex flex-col gap-4 md:gap-3.5'>
              <div className='flex gap-2.5 items-center flex-wrap'>
                <a href='https://www.linkedin.com/in/apoorv-pandey-0309b7196/'>
                  <FaLinkedin className='hover:text-green-500 mt-1' />
                </a>{" "}
                |{" "}
                <a href='https://github.com/aa-poorv?tab=repositories'>
                  <FaGithub className='hover:text-green-500 mt-1' />
                </a>{" "}
                |{" "}
                <a href='https://auth.geeksforgeeks.org/user/apoorvrpandey/?utm_source=geeksforgeeks&utm_medium=my_profile&utm_campaign=auth_user'>
                  <SiGeeksforgeeks className='hover:text-green-500 mt-1' />
                </a>{" "}
                |{" "}
                <a href='https://www.hackerrank.com/profile/apoorvrpandey'>
                  <FaHackerrank className='hover:text-green-500 mt-1' />
                </a>
                |
                <a href='https://www.codechef.com/users/hard_coder12'>
                  <SiCodechef className='hover:text-green-500 mt-1' />
                </a>
                |
                <a href='https://leetcode.com/aa_poorv/'>
                  <SiLeetcode className='hover:text-green-500 mt-1' />
                </a>
              </div>
              <div className='flex gap-2 items-start md:items-center mb-1 sm:mb-0'>
                <MdLocationOn className='text-green-600 w-4 md:w-auto mt-[5px] md:mt-0' />{" "}
                {"Electronic City phase one, Bangalore 560100"}
              </div>
            </div>
            <div>
              <div className='flex flex-col mt-2 md:mt-1.5 gap-[2px]'>
                <p> Any feedback / Contact Me </p>
                <Link
                  to={`mailto:apoorvrpandey@gmail.com?subject=Regarding RajEstate Website`}
                  className='hover:opacity-80 flex'
                >
                  <p className='flex gap-1 items-center'>
                    <CiMail className='mt-1' />{" "}
                    <p className='text-sm text-slate-300'>
                      apoorvrpandey@gmail.com
                    </p>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
