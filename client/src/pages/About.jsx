import React from "react";
import ApoorvPhoto from "../assets/ApoorvCopy.jpg";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { SiCodechef, SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { FaGithub, FaHackerrank, FaLinkedin } from "react-icons/fa";
function About() {
  return (
    <div className='flex flex-col'>
      {/* About Project */}
      <div className='flex flex-col md:flex-row gap-3 md:gap-6 w-full xl:max-w-[80%] py-10 md:py-16 mb-4 mt-12 px-7'>
        <div
          className='flex-auto shadow-lg min-h-[25rem] w-full md:w-[56rem]'
          style={{
            background:
              "url(https://content.mtfxgroup.com/uploads/india_hero_image_final_11_cfc9a90758.jpg) center no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className='flex flex-col gap-2 xl:gap-2.5 flex-auto w-auto md:w-[24rem]'>
          <h1 className='text-sm lg:text-base text-gray-400 leading-relaxed'>
            Our Vision
          </h1>
          <h1 className='text-2xl lg:text-3xl/tight mb-1 font-bold leading-tight'>
            Providing Home for all the{" "}
            <span className='text-slate-500'>Homies</span>
          </h1>
          <p className='text-base lg:text-lg text-gray-600'>
            Our aim is to provide a interface for{" "}
            <span className='font-medium'>seamless communication</span> between
            Seller and Buyer.
          </p>
          <p className='text-base lg:text-lg text-gray-600'>
            And to provide them at a cost so that each person have a{" "}
            <span className='font-medium'>place to call home</span>
          </p>
          <p className='text-base lg:text-lg text-gray-600'>
            We excel in the market of residential as well as luxurious property
          </p>
        </div>
      </div>
      <div className='border-t-4 border-dotted border-gray-300 w-[10%] mx-auto'></div>
      <div className='flex flex-col-reverse md:flex-row gap-3 md:gap-6 w-full xl:max-w-[80%] px-7 my-4 py-10 md:py-16 shrink self-end'>
        <div className='flex flex-col gap-2 xl:gap-2.5 flex-auto w-auto md:w-[24rem]'>
          <h1 className='text-sm lg:text-base text-gray-400 leading-normal lg:leading-relaxed'>
            Why choose us
          </h1>
          <h1 className='text-2xl lg:text-3xl/tight mb-1 font-bold'>
            So.. Do we got anything{" "}
            <span className='text-slate-500'>Special?</span>
          </h1>
          <p className='text-base lg:text-lg text-gray-600'>
            Virtual property tours to{" "}
            <span className='font-medium'>smart analytics</span>, we bring
            innovation to your fingertips.
          </p>
          <p className='text-base lg:text-lg text-gray-600'>
            Our team of dedicated{" "}
            <span className='font-semibold'>real estate experts</span> are
            committed to guiding you through every step of your property
            journey.
          </p>
          <p className='text-base lg:text-lg text-gray-600'>
            Our platform goes beyond transactions, focusing on{" "}
            <span className='font-medium'>building relationships.</span>
          </p>
        </div>
        <div
          className='flex-auto min-h-[25rem] w-full md:w-[56rem] shadow-lg'
          style={{
            background:
              "url(https://static2.tripoto.com/media/filter/nl/img/465086/TripDocument/1626007223_cover.jpg) center no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      {/* About Me */}
      <div className='flex flex-col gap-7 mb-24 mt-6'>
        {/* <div className='border-t-4 border-dotted border-gray-300 w-[30%] mx-auto'></div> */}
        <h1 className='px-3 text-center text-4xl font-bold'>About Developer</h1>
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 max-w-6xl mx-auto py-2 px-6 lg:px-2'>
          <img
            src={ApoorvPhoto}
            className='h-24 rounded-full'
            alt=''
          />
          <div className='flex flex-col max-w-md md:max-w-none gap-1 text-center md:text-left self-center'>
            <h1 className='text-xl font-bold text-zinc-600'>Apoorv Pandey</h1>
            <h1 className='text-xl font-medium text-slate-700 p-2 md:p-0'>
              Software developer with 1+ year of experience in developing
              applications.
            </h1>
          </div>
        </div>
        <div className='border-t-4 border-dotted border-gray-300 w-[10%] mx-auto'></div>
        <h1 className='px-3 text-center text-2xl font-bold text-zinc-700'>
          Hands on Technology
        </h1>
        <div className='flex flex-col md:flex-row gap-6 flex-wrap max-w-md md:max-w-6xl text-stone-900 mx-auto justify-center p-6 text-center'>
          <div className='bg-gradient-to-r from-teal-400 to-teal-500 shadow-md flex-1 flex flex-col gap-2 p-6 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:opacity-95 duration-200'>
            <h1 className='text-lg font-medium'>
              React.js & Next.js (Front end)
            </h1>
            <p>
              Developing front end development for more than 2 years developed
              Chat applications, Blogging, Hotel booking websites and many more.
            </p>
          </div>
          <div className='bg-gradient-to-r from-teal-400 to-teal-500 shadow-md flex-1 flex flex-col gap-2 p-6 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:opacity-95 duration-200'>
            <h1 className='text-lg font-medium'>
              Node.js & Express (Back end)
            </h1>
            <p>
              Developed standalone services as docker images, developed and
              designed YouTube, Chat(socket.io), Propiority e-commerce APIs and
              many more .
            </p>
          </div>
          <div className='bg-gradient-to-r from-teal-400 to-teal-500 shadow-md flex-1 flex flex-col gap-2 p-6 rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:opacity-95 duration-200'>
            <h1 className='text-lg font-medium'>MongoDB & MySQL (Database)</h1>
            <p>
              Worked mostly around MongoDB database with ODM mongoose but with
              needs switched to SQL database using sequalize ORM, used Redis for
              state storage
            </p>
          </div>
        </div>
      </div>
      <div className='bg-zinc-900'>
        <div className='flex flex-col sm:flex-row max-w-6xl mx-auto text-white justify-between px-3 py-16'>
          <div className='flex flex-col gap-2 sm:gap-2.5'>
            <div className='flex gap-2 items-center'>
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
            <div className='flex gap-1 items-center mb-3 sm:mb-0'>
              <MdLocationOn className='text-green-600' />{" "}
              {"Electronic City phase one, Bangalore 560100"}
            </div>
          </div>
          <div>
            <div className='flex flex-col mt-1 gap-[2px]'>
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
    </div>
  );
}

export default About;
