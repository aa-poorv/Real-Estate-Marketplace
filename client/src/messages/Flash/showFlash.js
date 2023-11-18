import { flashAction } from "../../redux/Flash/flashSlice";

export const statusChangeFlash = (messageValue, extraMessage) => {
  return async (dispatch) => {
    dispatch(
      flashAction({
        effectClass: "fadeIn",
        message: messageValue,
        extraMessage,
      })
    );
    setTimeout(() => {
      dispatch(
        flashAction({
          effectClass: "fadeOut",
          message: messageValue,
          extraMessage,
        })
      );
    }, 4000);
  };
};
