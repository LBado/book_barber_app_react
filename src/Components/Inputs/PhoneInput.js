import React, { useEffect } from 'react';
import usePhoneValidator from '../../Hooks/usePhoneValidator';
import '../../Styles/css/InputContainer.css';
import '../../Styles/css/Error.css';
const PhoneInput = ({ setPhoneInput }) => {
  const {
    enteredValue,
    isTouched,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = usePhoneValidator();

  useEffect(() => {
    setPhoneInput({
      isValid: isValid,
      isTouched: isTouched,
      hasError: hasError,
      blurFn: inputBlurHandler,
      resetFn: reset,
    });
  }, [isValid, isTouched, hasError, inputBlurHandler, reset, setPhoneInput]);

  return (
    <div className="inputContainer">
      <input
        value={enteredValue}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        type="text"
        placeholder="Contact Number"
      ></input>
      {hasError && <p className="inputError">Please enter phone number</p>}
    </div>
  );
};

export default PhoneInput;
