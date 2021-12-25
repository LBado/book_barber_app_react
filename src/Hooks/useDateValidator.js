import { useCallback, useState } from 'react';

const useDateValidator = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const dateDay = new Date(selectedValue).getDay();
  const isWeekend = dateDay === 0 || dateDay === 6 ? true : false;
  const isValid = selectedValue !== '' && !isWeekend;
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setSelectedValue(event.target.value);
  };

  const dateBlurHandler = useCallback(() => {
    setIsTouched(true);
  },[]);

  const reset = useCallback(() => {
    setSelectedValue('');
    setIsTouched(false);
  },[]);

  return {
    selectedValue,
    isTouched,
    isWeekend,
    isValid,
    hasError,
    valueChangeHandler,
    dateBlurHandler,
    reset,
  };
};

export default useDateValidator;
