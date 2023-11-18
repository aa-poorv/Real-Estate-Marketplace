import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { app } from "../firebase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createListing } from "../utils/http";
import { useDispatch } from "react-redux";
import { statusChangeFlash } from "../messages/Flash/showFlash";
import useLogout from "../hooks/use-logout";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const dispatch = useDispatch();
  const { logoutMutate } = useLogout({ expiredLogout: true });

  const { mutate, isPending } = useMutation({
    mutationFn: createListing,
    onSuccess: (data) => {
      navigate(`/listing/${data._id}`);
      dispatch(statusChangeFlash("Listing"));
    },
    onError: (err) => {
      if (err.info.message === "jwt expired") {
        logoutMutate();
      } else {
        dispatch(statusChangeFlash("Error", err.message));
      }
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    regularPrice: 1000,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    imageURLs: [],
  });

  const listingSubmitHandler = (event) => {
    event.preventDefault();
    mutate({ formData });
  };

  const formChangeHandler = (event) => {
    if (event.target.id === "rent" || event.target.id === "sell") {
      setFormData({ ...formData, type: event.target.id });
    } else if (
      event.target.id === "furnished" ||
      event.target.id === "parking" ||
      event.target.id === "offer"
    )
      setFormData({
        ...formData,
        [event.target.id]: !formData[event.target.id],
      });
    else setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const handleImageSubmit = () => {
    setImageUploadLoading(true);
    setImageUploadError(false);
    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((URLs) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(URLs),
          });
          setImageUploadLoading(false);
        })
        .catch((error) => {
          setImageUploadError(error);
          setImageUploadLoading(false);
          setTimeout(() => {
            setImageUploadError(false);
          }, 3000);
        });
    } else {
      setImageUploadError("Image upload failed (2mb max per image)");
      setImageUploadLoading(false);
      setTimeout(() => {
        setImageUploadError(false);
      }, 3000);
    }
  };

  const imageDeleteHandler = (index) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, i) => i !== index),
    });
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress, "%");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form
        className='flex flex-col sm:flex-row gap-4'
        onSubmit={listingSubmitHandler}
      >
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Title'
            className='border p-3 rounded-lg'
            onChange={formChangeHandler}
            value={formData.title}
            id='title'
            maxLength='50'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            onChange={formChangeHandler}
            value={formData.description}
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            onChange={formChangeHandler}
            value={formData.address}
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='sell'
                onChange={formChangeHandler}
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                onChange={formChangeHandler}
                checked={formData.type === "rent"}
                // only one of sale or rent can be checked because of above conditions.
                id='rent'
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                onChange={formChangeHandler}
                checked={formData.parking}
                id='parking'
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='furnished'
                onChange={formChangeHandler}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='offer'
                onChange={formChangeHandler}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                onChange={formChangeHandler}
                value={formData.bedrooms}
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                onChange={formChangeHandler}
                value={formData.bathrooms}
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1000'
                max='100000000'
                onChange={formChangeHandler}
                value={formData.regularPrice}
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div>
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className='text-xs'>(&#8377; / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='1000'
                  max='100000000'
                  onChange={formChangeHandler}
                  value={formData.discountPrice}
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                />
                <div>
                  <p>Discount price</p>

                  {formData.type === "rent" && (
                    <span className='text-xs'>(&#8377; / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='mt-2'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              type='file'
              id='images'
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-24'
              disabled={imageUploadLoading}
            >
              {imageUploadLoading ? (
                <TailSpin
                  height='24'
                  width='50'
                  color='black'
                  ariaLabel='tail-spin-loading'
                  radius='2'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
              ) : (
                "Upload"
              )}
            </button>
          </div>
          {imageUploadError && (
            <p className='text-red-600'>
              Image upload failed(2 mb max per image)
            </p>
          )}

          {formData.imageURLs.length > 0 && (
            <ul>
              {formData.imageURLs.map((imageURL, index) => (
                <li
                  className='flex justify-between border border-gray-300 items-center p-3 my-3'
                  key={imageURL}
                >
                  <img
                    src={imageURL}
                    alt='Listing Image'
                    className='w-20 h-20 object-contain '
                  />
                  <p
                    onClick={() => imageDeleteHandler(index)}
                    className='text-red-700 uppercase hover:opacity-80 cursor-pointer'
                  >
                    delete
                  </p>
                </li>
              ))}
            </ul>
          )}
          <button
            type='submit'
            className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3 flex justify-center'
            disabled={isPending || imageUploadLoading}
          >
            {isPending ? (
              <TailSpin
                height='24'
                width='50'
                color='white'
                ariaLabel='tail-spin-loading'
                radius='2'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
              />
            ) : (
              "Create Listing"
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
