import React, { useEffect } from 'react';
import useInputValidator from '../../Hooks/useInputValidator';
import '../../Styles/css/InputContainer.css';
import '../../Styles/css/Error.css';
const LNameInput = ({ setLNameInput }) => {
  console.log('loading name input');
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
    setLNameInput({
      isValid: isValid,
      isTouched: isTouched,
      hasError: hasError,
      blurFn: inputBlurHandler,
      resetFn: reset,
    });
  }, [isValid, isTouched, hasError, inputBlurHandler, reset, setLNameInput]);

  return (
    <div className="inputContainer">
      <input
        className="nameInput"
        value={enteredValue}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        type="text"
        placeholder="Last Name"
      ></input>
    </div>
  );
};

export default LNameInput;
