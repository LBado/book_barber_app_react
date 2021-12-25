import { useCallback, useState } from 'react';

const useInputValidator = (validateValueFn) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValueFn(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue((prev) => (prev = event.target.value));
  };

  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);
  },[]);

  const reset = useCallback(() => {
    setEnteredValue('');
    setIsTouched(false);
  },[]);

  return {
    enteredValue,
    isTouched,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputValidator;
