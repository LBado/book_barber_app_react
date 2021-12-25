import { useCallback, useState } from 'react';

const usePhoneValidator = () => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const phoneUtil =
    require('google-libphonenumber').PhoneNumberUtil.getInstance();

  const isValid = enteredValue !== '' && isPhoneValid;
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue((prev) => (prev = event.target.value));
  };

  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);

    if (enteredValue.trim().length < 6) {
      setIsPhoneValid(false);
      return;
    }

    const number = phoneUtil.parseAndKeepRawInput(enteredValue.trim(), 'SI');
    setIsPhoneValid(phoneUtil.isValidNumber(number));
    console.log(phoneUtil.isValidNumber(number));
  }, [enteredValue, phoneUtil]);

  const reset = useCallback(() => {
    setEnteredValue('');
    setIsTouched(false);
  }, []);

  return {
    enteredValue,
    isTouched,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default usePhoneValidator;
