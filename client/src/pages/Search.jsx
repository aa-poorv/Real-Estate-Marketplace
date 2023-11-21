import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { queryListings } from "../utils/http";
import { TailSpin } from "react-loader-spinner";
import ErrorBlock from "../components/UI/ErrorBlock";
import ListingCard from "../components/ListingCard";
import {
  FaGithub,
  FaHackerrank,
  FaLinkedin,
  FaRegHandPeace,
} from "react-icons/fa6";
import { SiCodechef, SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";
import { CiMail } from "react-icons/ci";

const Search = () => {
  const [filterState, setFilterState] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  const navigate = useNavigate();
  const [searchingURL, setSearchingURL] = useState(
    new URLSearchParams(location.search).toString()
  );

  useEffect(() => {
    const searchURL = new URLSearchParams(location.search);
    const searchTermFromUrl = searchURL.get("searchTerm");
    const typeFromUrl = searchURL.get("type");
    const offerFromUrl = searchURL.get("offer");
    const parkingFromUrl = searchURL.get("parking");
    const furnishedFromUrl = searchURL.get("furnished");
    const sortFromUrl = searchURL.get("sort");
    const orderFromUrl = searchURL.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl
    ) {
      setFilterState({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    setSearchingURL(searchURL.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const {
    data,
    isFetching,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["listings", searchingURL],
    queryFn: ({ queryKey, pageParam = 1 }) =>
      queryListings({ queryString: queryKey[1], pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === 9 ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const searchURL = new URLSearchParams(location.search);
    for (let key in filterState) {
      searchURL.set(key, filterState[key]);
    }
    const searchQuery = searchURL.toString();
    setSearchingURL(searchQuery);
    navigate(`/search?${searchQuery}`);
  };

  const handleChange = (event) => {
    if (
      event.target.id === "all" ||
      event.target.id === "rent" ||
      event.target.id === "sell"
    )
      setFilterState({ ...filterState, type: event.target.id });

    if (
      event.target.id === "offer" ||
      event.target.id === "parking" ||
      event.target.id === "furnished"
    )
      setFilterState({
        ...filterState,
        [event.target.id]: !filterState[event.target.id],
      });

    if (event.target.id === "searchTerm")
      setFilterState({ ...filterState, [event.target.id]: event.target.value });

    if (event.target.id === "sort_order") {
      const sort = event.target.value.split("_")[0] || "createdAt";
      const order = event.target.value.split("_")[1] || "updatedAt";

      setFilterState({ ...filterState, sort, order });
    }
  };

  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen font-[475]'>
          <form
            className='flex flex-col gap-8'
            onSubmit={submitHandler}
          >
            <div className='flex items-center gap-2.5'>
              <label className='whitespace-nowrap font-semibold'>
                Search Term:{" "}
              </label>
              <input
                type='text'
                value={filterState.searchTerm}
                onChange={handleChange}
                placeholder='Search...'
                className='p-3 rounded-lg w-full border text-base font-normal'
                id='searchTerm'
              />
            </div>
            <div className='flex gap-3 flex-wrap items-center'>
              <label className='whitespace-nowrap font-semibold'>Type:</label>
              <div className='flex gap-1.5'>
                <input
                  type='checkbox'
                  id='all'
                  checked={filterState.type === "all"}
                  onChange={handleChange}
                  className='w-5'
                />
                <span className='whitespace-nowrap'>Rent & Sale</span>
              </div>

              <div className='flex gap-1.5'>
                <input
                  type='checkbox'
                  checked={filterState.type === "rent"}
                  onChange={handleChange}
                  id='rent'
                  className='w-5'
                />
                <span>Rent</span>
              </div>
              <div className='flex gap-1.5'>
                <input
                  type='checkbox'
                  checked={filterState.type === "sell"}
                  onChange={handleChange}
                  id='sell'
                  className='w-5'
                />
                <span>Sale</span>
              </div>
              <div className='flex gap-1.5'>
                <input
                  type='checkbox'
                  checked={filterState.offer}
                  onChange={handleChange}
                  id='offer'
                  className='w-5'
                />
                <span>Offer</span>
              </div>
            </div>
            <div className='flex gap-3 flex-wrap items-center'>
              <label className='font-semibold'>Amenities:</label>
              <div className='flex gap-1.5'>
                <input
                  type='checkbox'
                  checked={filterState.parking}
                  onChange={handleChange}
                  id='parking'
                  className='w-5'
                />
                <span>Parking</span>
              </div>

              <div className='flex gap-1.5'>
                <input
                  type='checkbox'
                  checked={filterState.furnished}
                  onChange={handleChange}
                  id='furnished'
                  className='w-5'
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className='flex items-center gap-2.5'>
              <label className='font-semibold'>Sort:</label>
              <select
                id='sort_order'
                className='text-base border rounded-lg p-3'
                defaultValue={"createdAt_desc"}
                onChange={handleChange}
              >
                <option
                  value='regularPrice_desc'
                  className='text-base font-normal m-3'
                >
                  Price high to low
                </option>
                <option
                  value='regularPrice_asc'
                  className='text-base font-normal m-3'
                >
                  Price low to high
                </option>
                <option
                  value='createdAt_desc'
                  className='text-base font-normal m-3'
                >
                  Latest
                </option>
                <option
                  value='createdAt_asc'
                  className='text-base font-normal m-3'
                >
                  Oldest
                </option>
              </select>
            </div>
            <button
              type='submit'
              className='w-full bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 uppercase text-base font-medium'
            >
              Search
            </button>
          </form>
        </div>
        <div className='flex-1 pb-10'>
          <h1 className='text-3xl font-semibold border-b p-4 text-slate-700'>
            Listing results:
          </h1>
          {status === "pending" && (
            <div className='mt-20 flex justify-center'>
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
          )}
          {status === "error" && (
            <ErrorBlock
              title='Failed to load event'
              message={
                error.info?.message ||
                "Failed to load event. Please check your inputs and try again later."
              }
            />
          )}
          {status === "success" && (
            <>
              {data.pages[0].length === 0 && (
                <div className='w-[100%] flex '>
                  <span className='text-xl font-medium text-gray-500 mx-auto ml-7 mt-5'>
                    No Listings Available!!
                  </span>
                </div>
              )}
              <div className='flex gap-3 p-7 flex-wrap items-stretch'>
                {data.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.map((listing) => (
                      <ListingCard
                        key={listing._id}
                        listing={listing}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
              {hasNextPage && !isFetchingNextPage && (
                <div className='flex justify-center p-4 m-2'>
                  <span
                    className=' flex items-center gap-1 text-green-700 animate-bounce cursor-pointer'
                    onClick={() => fetchNextPage()}
                  >
                    <p className='text-lg'>Show more</p>
                    <FaRegHandPeace
                      className='self-center align-bottom'
                      style={{ verticalAlign: "bottom" }}
                    />
                  </span>
                </div>
              )}
              {isFetchingNextPage && (
                <div className='mt-20 flex justify-center'>
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
              )}
            </>
          )}
        </div>
      </div>
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
                className='hover:opacity-80'
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
    </>
  );
};

export default Search;
