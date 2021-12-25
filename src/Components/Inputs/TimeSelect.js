import React, { useEffect } from 'react';
import useTimeValidator from '../../Hooks/useTimeValidator';
import '../../Styles/css/Error.css';
import '../../Styles/css/SelectContainer.css';

const TimeSelect = ({
  timeSchedule,
  dateIsWeekend,
  dateIsValid,
  setTimeSelect,
}) => {
  const {
    selectedValue,
    isTouched,
    isValid,
    hasError,
    valueChangeHandler,
    selectBlurHandler,
    reset,
  } = useTimeValidator('default', dateIsValid, dateIsWeekend);

  useEffect(() => {
    setTimeSelect({
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
    setTimeSelect,
    selectedValue,
  ]);

  return (
    <div className="selectContainer">
      <select
        value={selectedValue}
        onChange={valueChangeHandler}
        onBlur={selectBlurHandler}
      >
        <option value="default" hidden>
          Select Time
        </option>
        <option value="closed" hidden>
          Closed
        </option>
        {dateIsValid &&
          timeSchedule.map((schedule, index) => {
            if (schedule.status === 'free') {
              return (
                <option key={index} value={index}>
                  {schedule.time}
                </option>
              );
            }
            return null;
          })}
      </select>
      {hasError && <p className="inputError">Please pick a time</p>}
    </div>
  );
};

export default TimeSelect;
