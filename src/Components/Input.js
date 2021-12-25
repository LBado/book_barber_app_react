import React, { useEffect, useState } from 'react';
//za onSubmit forwardiraš ref za value, valid
const Input = ({
  errorMessage,
  placeHolder,
  readOnly,
  type,
  validationFn,
  setChildData,
}) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationFn(value);
  const isError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    event.preventDefault();
    setValue((prev) => (prev = event.target.value));
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setValue('');
    setIsTouched(false);
  };

  useEffect(() => {
    setChildData({
      resetFn: resetInput,
      valueIsValid: valueIsValid,
      isError: isError,
    });
  }, [valueIsValid, setChildData, isError]);

  return (
    <>
      {readOnly ? (
        <input value={value} placeholder={placeHolder} readOnly />
      ) : (
        <input
          type={type}
          onChange={valueChangeHandler}
          value={value}
          placeholder={placeHolder}
          onBlur={blurHandler}
        />
      )}
      {/* {isError && <p>{errorMessage}</p>} */}
    </>
  );
};

export default Input;
