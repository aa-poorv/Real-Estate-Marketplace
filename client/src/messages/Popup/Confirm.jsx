/* eslint-disable react/prop-types */
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import React from "react";
import "./confirm.css";

const Confirm = ({
  isConfirmOpen,
  confirmationClose,
  deletingUserHandler,
  message,
  confirmDeleteLoading,
}) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: 0 }}
        open={isConfirmOpen}
        onClick={confirmationClose}
      ></Backdrop>
      {isConfirmOpen && (
        <div className='bg-amber-100 w-96 fixed top-14 p-8 z-50 rounded-lg shadow-md left-0 right-0 mx-auto'>
          <Stack
            sx={{
              width: "100%",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
            spacing={2}
          >
            <Alert
              className='.css-1vooibu-MuiSvgIcon-root'
              severity='warning'
              sx={{
                fontSize: "1.2rem",
              }}
            >
              {message}
            </Alert>
          </Stack>
          {confirmDeleteLoading ? (
            <div className='flex flex-row-reverse text-red-600'>
              <button
                className='ml-4 border-black p-2 bg-slate-100 rounded-lg hover:opacity-95'
                disabled={true}
              >
                Deleting...
              </button>
            </div>
          ) : (
            <div className='flex flex-row-reverse text-black '>
              <button
                className='ml-4 border-black p-2 bg-slate-100 rounded-lg hover:opacity-95'
                onClick={confirmationClose}
              >
                {" "}
                Cancel
              </button>
              <button
                className='border-black p-2 bg-slate-100 rounded-lg hover:opacity-95'
                onClick={deletingUserHandler}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Confirm;
