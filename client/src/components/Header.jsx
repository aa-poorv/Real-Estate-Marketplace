/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Raj</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        <form
          className='bg-slate-100 p-3 rounded-lg flex items-center'
          onSubmit={searchSubmitHandler}
        >
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={searchChangeHandler}
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button type='submit'>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline text-gray-800" : undefined
            }
            to='/'
          >
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline text-gray-800" : undefined
            }
            to='/about'
          >
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </NavLink>
          {/* {userData && <li> {userData.username} </li>} */}
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline text-gray-800" : undefined
            }
            to='/profile'
          >
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'>Sign in</li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
}

export default Header;
