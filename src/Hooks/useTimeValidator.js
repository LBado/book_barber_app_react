import { useCallback, useEffect, useState } from 'react';

const useTimeValidator = (defaultValue, dateValid, isWeekend) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);
  useEffect(() => {
    if (!dateValid && isWeekend) {
      setSelectedValue('closed');
    }
    if (dateValid) {
      setSelectedValue(defaultValue);
    }
  }, [dateValid, isWeekend, defaultValue]);

  const isValid =
    selectedValue !== defaultValue && selectedValue !== 'closed' && dateValid;
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setSelectedValue(event.target.value);
  };

  const selectBlurHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setSelectedValue('');
    setIsTouched(false);
  }, []);

  return {
    selectedValue,
    isTouched,
    isValid,
    hasError,
    valueChangeHandler,
    selectBlurHandler,
    reset,
  };
};

export default useTimeValidator;
