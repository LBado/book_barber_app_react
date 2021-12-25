import React, { useEffect } from 'react';
import useSelectValidator from '../../Hooks/useSelectValidator';
import '../../Styles/css/Error.css';
import '../../Styles/css/SelectContainer.css';

const BarberSelect = ({ barbersData, setBarberSelect }) => {
  const {
    selectedValue,
    isTouched,
    isValid,
    hasError,
    valueChangeHandler,
    selectBlurHandler,
    reset,
  } = useSelectValidator('');

  useEffect(() => {
    setBarberSelect({
      selectedValue: selectedValue,
      isValid: isValid,
      isTouched: isTouched,
      hasError: hasError,
      blurFn: selectBlurHandler,
      resetFn: reset,
    });
  }, [
    isValid,
    isTouched,
    hasError,
    selectBlurHandler,
    reset,
    setBarberSelect,
    selectedValue,
  ]);

  return (
    <div className="selectContainer">
      <select
        value={selectedValue}
        onChange={valueChangeHandler}
        onBlur={selectBlurHandler}
      >
        <option value="" hidden>
          Select Barber
        </option>
        {barbersData.map((barber, index) => (
          <option
            key={barber.id}
            value={barber.id}
          >{`${barber.firstName} ${barber.lastName}`}</option>
        ))}
      </select>
      {hasError && <p className="inputError">Please select a barber</p>}
    </div>
  );
};

export default BarberSelect;
