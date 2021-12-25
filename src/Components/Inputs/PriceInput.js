import React, { useCallback, useEffect, useState } from 'react';
import '../../Styles/css/PriceContainer.css';

const PriceInput = ({
  servicesData,
  serviceValue,
  dateIsWeekend,
  dateIsValid,
  setPriceInput,
}) => {
  const [price, setPrice] = useState('');
  useEffect(() => {
    if (serviceValue !== undefined && serviceValue !== '' && !dateIsWeekend) {
      console.log(serviceValue);
      console.log('running useeffect');
      const servicePrice = servicesData.find(
        (service) => service.id === +serviceValue
      ).price;
      setPrice(`Price is ${servicePrice} €`);
    }
    if (!dateIsValid && dateIsWeekend) {
      setPrice('CLOSED');
    }
  }, [serviceValue, dateIsValid, dateIsWeekend, servicesData]);

  const reset = useCallback(() => {
    setPrice('');
  },[]);

  useEffect(() => {
    setPriceInput({
      reset: reset,
    });
  }, [setPriceInput, reset]);


  return (
    <div className="priceContainer">
      <input
        readOnly
        value={price}
        type="text"
        placeholder="Select a Service"
      ></input>
    </div>
  );
};

export default PriceInput;
