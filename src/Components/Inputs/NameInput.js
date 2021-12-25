import React, { useEffect } from 'react';
import useInputValidator from '../../Hooks/useInputValidator';
import '../../Styles/css/InputContainer.css';
import '../../Styles/css/Error.css';
const NameInput = ({ setNameInput }) => {
  const nameValFn = (value) => value.trim() !== '' && !/[^a-zA-Z]/.test(value);

  const {
    enteredValue,
    isTouched,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInputValidator(nameValFn);

  useEffect(() => {
    setNameInput({
      isValid: isValid,
      isTouched: isTouched,
      hasError: hasError,
      blurFn: inputBlurHandler,
      resetFn: reset,
    });
  }, [isValid, isTouched, hasError, inputBlurHandler, reset, setNameInput]);

  return (
    <div className="inputContainer">
      <input
        className="nameInput"
        value={enteredValue}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        type="text"
        placeholder="First Name"
      ></input>
    </div>
  );
};

export default NameInput;
