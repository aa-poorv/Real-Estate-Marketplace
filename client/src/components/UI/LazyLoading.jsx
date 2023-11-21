/* eslint-disable react/prop-types */
import React, { useState } from "react";
import bannerImage from "../../assets/banner.jpg";

const LazyLoading = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {loaded ? null : <div className='h-[26px] w-[26px] bg-slate-200' />}
      <img
        style={loaded ? {} : { display: "none" }}
        src={src}
        placeholder={bannerImage}
        className='rounded-full h-[26px] w-[26px] md:h-8 md:w-8 object-cover z-40'
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default LazyLoading;
