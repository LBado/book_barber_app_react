import React, { useEffect } from 'react';
import useSelectValidator from '../../Hooks/useSelectValidator';
import '../../Styles/css/Error.css';
import '../../Styles/css/SelectContainer.css';
const ServiceSelect = ({ servicesData, setServiceSelect }) => {
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
    setServiceSelect({
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
    setServiceSelect,
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
          Select Service
        </option>
        {servicesData.length !== 0 &&
          servicesData.map((service, index) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
      </select>
      {hasError && <p className="inputError">Please select a service</p>}
    </div>
  );
};

export default ServiceSelect;
