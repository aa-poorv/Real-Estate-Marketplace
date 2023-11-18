import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import useInput from "../hooks/use-input";
import { useMutation } from "@tanstack/react-query";
import { signInSuccess, signOutSuccess } from "../redux/user/userSlice";
import {
  deleteListing,
  deleteUser,
  logoutUser,
  updateUser,
  queryClient,
} from "../utils/http";
import { useDispatch } from "react-redux";
import Confirm from "../messages/Popup/Confirm";
import { statusChangeFlash } from "../messages/Flash/showFlash";
import UserListings from "../components/UserListings";
import useLogout from "../hooks/use-logout";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletingId, setDeletingId] = useState();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const { logoutMutate: expiredLogout } = useLogout({ sessionExpired: true });
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null);
  const [listingsOpen, setListingsOpen] = useState(false);

  const emailValidation = (val) => (val.includes("@") ? true : false);

  const usernameValidation = (val) =>
    val.includes(" ") || val.length <= 3 ? false : true;

  const confirmationOpen = () => {
    setIsConfirmOpen(true);
  };

  const confirmationClose = () => {
    setIsConfirmOpen(false);
  };

  const confirmOpenHandler = ({ id }) => {
    setDeleteConfirmation(true);
    setDeletingId(id);
  };

  const confirmCloseHandler = () => {
    setDeleteConfirmation(false);
  };

  const {
    val: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    isInputInvalid: isEmailInvalid,
    isInputValid: isEmailValid,
  } = useInput(currentUser.email, emailValidation);
  const {
    val: usernameValue,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    isInputInvalid: isUsernameInvalid,
    isInputValid: isUsernameValid,
  } = useInput(currentUser.username, usernameValidation);

  let formValid = isEmailValid && isUsernameValid;
  const imageChangeHandler = (e) => {
    handleFileUpload(e.target.files[0]);
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    // create a storage through get storage using firebase storage.
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName); // where to store the file in the database
    const uploadTask = uploadBytesResumable(storageRef, file); // uploading the file provided in firebase at the storageRef location provided
    // Now we use this upload task to get the uploading information like if error happened or the progress of the upload operation
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Invokes in every state change event of uploadTask variable Here first callback receives snapshot of file uploading stages.
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        // Second callback receives error if the state changed to error happened.
        setFileUploadError(true);
      },
      async () => {
        // Third callback doesn't need any input parameters as it will be called after state changed to download completed.
        // Therefore we can download the image uploaded url.
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setAvatar(downloadURL);
        setTimeout(() => {
          setFilePerc(0);
        }, 6000);
      }
    );
  };

  const { mutate: deleteMutate, isPending: deletionPending } = useMutation({
    mutationFn: deleteListing,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      dispatch(statusChangeFlash("Delete", "Listing deleted"));
      confirmCloseHandler();
    },
    onError: (error) => {
      if (error.info.message === "jwt expired") {
        expiredLogout();
      } else {
        dispatch(statusChangeFlash("Error", error.message));
      }
      confirmCloseHandler();
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      dispatch(statusChangeFlash("Success"));
      dispatch(signInSuccess(data));
    },
    onError: (error) => {
      if (error.info.message === "jwt expired") {
        expiredLogout();
      } else {
        dispatch(statusChangeFlash("Error", error.message));
      }
    },
  });

  const { mutate: deleteMutation, isPending: deletePending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      confirmationClose();
      dispatch(signOutSuccess());
      dispatch(statusChangeFlash("Delete", "User Deleted"));
    },
    onError: (error) => {
      if (error.info.message === "jwt expired") {
        expiredLogout();
      } else {
        dispatch(statusChangeFlash("Error", error.message));
      }
      confirmationClose();
    },
  });

  const { logoutMutate, logoutPending } = useLogout({ sessionExpired: false });

  const deletingUserHandler = () => {
    deleteMutation({ id: currentUser._id });
  };

  const deletingListingHandler = () => {
    deleteMutate({ id: deletingId });
  };

  const onUpdateHandler = (event) => {
    event.preventDefault();
    if (!formValid) return statusChangeFlash();
    const formData = {
      username: usernameValue,
      email: emailValue,
      avatar,
      password: passwordRef.current.value ? passwordRef.current.value : "",
    };
    mutate({ formData });
  };

  const onSignOutHandler = () => {
    logoutMutate();
  };

  const showAllListingHandler = () => {
    setListingsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <Confirm
        isConfirmOpen={isConfirmOpen}
        deletingUserHandler={deletingUserHandler}
        confirmationClose={confirmationClose}
        confirmDeleteLoading={deletePending}
        message='Do you really want to delete the account?'
      />

      <Confirm
        isConfirmOpen={deleteConfirmation}
        deletingUserHandler={deletingListingHandler}
        confirmationClose={confirmCloseHandler}
        confirmDeleteLoading={deletionPending}
        message='Do you really want ot delete this property listing?'
      />
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form
          onSubmit={onUpdateHandler}
          className='flex flex-col gap-4'
        >
          <input
            onChange={imageChangeHandler}
            type='file'
            hidden
            ref={fileRef}
            accept='image/*'
          />
          <img
            src={avatar || currentUser.avatar}
            onClick={() => fileRef.current.click()}
            alt='User-Image'
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
          />
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>{`Error Image upload(Image should be < 2mb)`}</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <div>
            <input
              type='text'
              id='username'
              onBlur={usernameBlurHandler}
              value={usernameValue}
              onChange={usernameChangeHandler}
              placeholder='username'
              className='border p-3 rounded-lg w-full'
            />
            {isUsernameInvalid && (
              <p className='text-red-500 ml-3'>username is not valid</p>
            )}
          </div>
          <div>
            <input
              type='email'
              id='email'
              onBlur={emailBlurHandler}
              value={emailValue}
              onChange={emailChangeHandler}
              placeholder='email'
              className='border p-3 rounded-lg w-full'
            />
            {isEmailInvalid && (
              <p className='text-red-500 ml-3'>email is not valid</p>
            )}
          </div>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            placeholder='password'
            className='border p-3 rounded-lg'
          />

          <button
            type='submit'
            className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 flex align-middle justify-center'
          >
            {isPending ? (
              <TailSpin
                height='24'
                width='50'
                color='#F0FFFF'
                ariaLabel='tail-spin-loading'
                radius='2'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
              />
            ) : (
              "update"
            )}
          </button>
          <Link
            to={"/create-listing"}
            className='bg-green-700 text-white rounded-lg uppercase text-center p-3 hover:opacity-95'
          >
            Create Listing
          </Link>
        </form>
        <div className='flex justify-between mt-5'>
          <span
            className='text-red-600 cursor-pointer'
            onClick={confirmationOpen}
          >
            {deletePending ? "Deleting account.." : "Delete account"}
          </span>
          <span
            className='text-red-600 cursor-pointer'
            onClick={onSignOutHandler}
          >
            {logoutPending ? "Signing out.." : "Sign out"}
          </span>
        </div>
        <div className='flex justify-center align-middle mt-5'>
          <span
            className='text-green-600 cursor-pointer'
            onClick={showAllListingHandler}
          >
            Show Listings
          </span>
        </div>
        <div>
          {listingsOpen && (
            <UserListings
              currentUser={currentUser}
              openConfirmHandler={confirmOpenHandler}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
