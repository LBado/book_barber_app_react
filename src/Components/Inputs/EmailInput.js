import React, { useEffect } from 'react';
import useInputValidator from '../../Hooks/useInputValidator';
import '../../Styles/css/InputContainer.css';
import '../../Styles/css/Error.css';

const EmailInput = ({ setEmailInput }) => {
  let validator = require('email-validator');
  const emailValFn = (value) =>
    value.includes('@') && value.trim() !== '' && validator.validate(value);

  const {
    enteredValue,
    isTouched,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInputValidator(emailValFn);

  useEffect(() => {
    setEmailInput({
      isValid: isValid,
      isTouched: isTouched,
      hasError: hasError,
      blurFn: inputBlurHandler,
      resetFn: reset,
    });
  }, [isValid, isTouched, hasError, inputBlurHandler, reset, setEmailInput]);

  return (
    <div className="inputContainer">
      <input
        value={enteredValue}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        type="text"
        placeholder="Email"
      ></input>
      {hasError && <p className="inputError">Please enter valid email</p>}
    </div>
  );
};

export default EmailInput;
