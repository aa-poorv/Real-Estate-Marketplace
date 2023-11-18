import React, { useState } from "react";

const useInput = (initialValue, validCheck) => {
  const [val, setVal] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const isInputValid = validCheck(val);
  const isInputInvalid = isTouched && !isInputValid;

  const inputChangeHandler = (event) => {
    setVal(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    val,
    inputChangeHandler,
    inputBlurHandler,
    isInputInvalid,
    isInputValid,
  };
};

export default useInput;
