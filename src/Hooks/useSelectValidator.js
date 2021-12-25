import { useCallback, useState } from 'react';

const useSelectValidator = (defaultValue) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = selectedValue !== defaultValue;
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setSelectedValue(event.target.value);
  };

  const selectBlurHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setSelectedValue(defaultValue);
    setIsTouched(false);
  }, [defaultValue]);

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

export default useSelectValidator;
