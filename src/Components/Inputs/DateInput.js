import React, { useEffect } from 'react';
import useDateValidator from '../../Hooks/useDateValidator';
import '../../Styles/css/InputContainer.css';
import '../../Styles/css/Error.css';

const DateInput = ({ setDateInput }) => {
  const {
    selectedValue,
    isTouched,
    isWeekend,
    isValid,
    hasError,
    valueChangeHandler,
    dateBlurHandler,
    reset,
  } = useDateValidator();

  useEffect(() => {
    setDateInput({
      selectedValue: selectedValue,
      isWeekend: isWeekend,
      isValid: isValid,
      isTouched: isTouched,
      hasError: hasError,
      blurFn: dateBlurHandler,
      resetFn: reset,
    });
  }, [
    isValid,
    isWeekend,
    isTouched,
    hasError,
    dateBlurHandler,
    reset,
    setDateInput,
    selectedValue,
  ]);

  return (
    <div className="inputContainer">
      <input
        placeholder="Select Date"
        type="date"
        onChange={valueChangeHandler}
        onBlur={dateBlurHandler}
        value={selectedValue}
      ></input>
      {hasError && <p className="inputError">Please pick a date</p>}
    </div>
  );
};

export default DateInput;
