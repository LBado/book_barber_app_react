import React, { useEffect, useState } from 'react';
import useDateValidator from '../Hooks/useDateValidator';
import useInputValidator from '../Hooks/useInputValidator';
import usePhoneValidator from '../Hooks/usePhoneValidator';
import useScheduleGenerator from '../Hooks/useScheduleGenerator';
import useSelectValidator from '../Hooks/useSelectValidator';
import useTimeValidator from '../Hooks/useTimeValidator';
import '../Styles/ContactForm.css';
import {
  convertDateToMs,
  convertDateToUnix,
  getMsFromTime,
} from '../Utility/timeManipulation';

const ContactForm = ({
  barbersData,
  servicesData,
  appointmentsData,
  isPhone,
  sendAppointment,
}) => {
  let validator = require('email-validator');

  const [price, setPrice] = useState('');
  const nameValFn = (value) => value.trim() !== '' && !/[^a-zA-Z]/.test(value);
  const emailValFn = (value) =>
    value.includes('@') && value.trim() !== '' && validator.validate(value);

  const {
    enteredValue: pValue,
    isTouched: pIsTouched,
    isValid: pIsValid,
    hasError: pHasError,
    valueChangeHandler: pChangedHandler,
    inputBlurHandler: pBlurHandler,
    reset: pReset,
  } = usePhoneValidator();

  const {
    enteredValue: fValue,
    isTouched: fIsTouched,
    isValid: fIsValid,
    hasError: fHasError,
    valueChangeHandler: fChangedHandler,
    inputBlurHandler: fBlurHandler,
    reset: fReset,
  } = useInputValidator(nameValFn);

  const {
    enteredValue: lValue,
    isTouched: lIsTouched,
    isValid: lIsValid,
    hasError: lHasError,
    valueChangeHandler: lChangedHandler,
    inputBlurHandler: lBlurHandler,
    reset: lReset,
  } = useInputValidator(nameValFn);

  const {
    enteredValue: eValue,
    isTouched: eIsTouched,
    isValid: eIsValid,
    hasError: eHasError,
    valueChangeHandler: eChangedHandler,
    inputBlurHandler: eBlurHandler,
    reset: eReset,
  } = useInputValidator(emailValFn);

  const {
    selectedValue: bValue,
    isTouched: bIsTouched,
    isValid: bIsValid,
    hasError: bHasError,
    valueChangeHandler: bChangedHandler,
    selectBlurHandler: bBlurHandler,
    reset: bReset,
  } = useSelectValidator('');

  const {
    selectedValue: sValue,
    isTouched: sIsTouched,
    isValid: sIsValid,
    hasError: sHasError,
    valueChangeHandler: sChangedHandler,
    selectBlurHandler: sBlurHandler,
    reset: sReset,
  } = useSelectValidator('');

  const {
    selectedValue: dValue,
    isTouched: dIsTouched,
    isWeekend: dIsWeekend,
    isValid: dIsValid,
    hasError: dHasError,
    valueChangeHandler: dChangedHandler,
    dateBlurHandler: dBlurHandler,
    reset: dReset,
  } = useDateValidator();

  const {
    selectedValue: tValue,
    isTouched: tIsTouched,
    isValid: tIsValid,
    hasError: tHasError,
    valueChangeHandler: tChangedHandler,
    valueHandler: tValueHandler,
    selectBlurHandler: tBlurHandler,
    reset: tReset,
  } = useTimeValidator('default', dateInput.isValid, dateInput.isWeekend);

  const { timeSchedule } = useScheduleGenerator(
    bValue,
    dValue,
    sValue,
    dIsValid,
    bIsValid,
    sIsValid,
    appointmentsData,
    barbersData,
    servicesData
  );

  useEffect(() => {
    if (sValue !== undefined && sValue !== '' && !IsWeekend) {
      console.log(sValue);
      console.log('running useeffect');
      const servicePrice = servicesData.find(
        (service) => service.id === +sValue
      ).price;
      setPrice(`Price is ${servicePrice} €`);
    }
    if (!dIsValid && dIsWeekend) {
      setPrice('CLOSED');
    }
  }, [sValue, dIsValid, dIsWeekend, servicesData]);

  const formSubmitHandler = (event) => {
    const valids = [
      fIsValid,
      lIsValid,
      eIsValid,
      pIsValid,
      bIsValid,
      sIsValid,
      dIsValid,
      tIsValid,
    ];

    event.preventDefault();
    if (valids.some((i) => i === false)) {
      console.log('Form NOT valid');
      console.log(valids);
      if (!fIsValid && !fIsTouched) {
        fBlurHandler();
      }
      if (!lIsValid && !lIsTouched) {
        lBlurHandler();
      }
      if (!eIsValid && !eIsTouched) {
        eBlurHandler();
      }
      if (!pIsValid && !pIsTouched) {
        pBlurHandler();
      }
      if (!bIsValid && !bIsTouched) {
        bBlurHandler();
      }
      if (!sIsValid && !sIsTouched) {
        sBlurHandler();
      }
      if (!dIsValid && !dIsTouched) {
        dBlurHandler();
      }
      if (!tIsValid && !tIsTouched) {
        tBlurHandler();
      }
      return;
    }

    console.log('Form IS valid');
    const barberId = bValue;
    const serviceId = sValue;
    const date = convertDateToMs(dValue);
    const time = getMsFromTime(timeSchedule[tValue].time);
    const unixDate = convertDateToUnix(time + date);

    const appointmentObj = {
      startDate: +unixDate,
      barberId: +barberId,
      serviceId: +serviceId,
    };

    console.log(appointmentObj);
    sendAppointment(appointmentObj);

    //reset
    setPrice('');
    fReset();
    lReset();
    eReset();
    pReset();
    bReset();
    sReset();
    dReset();
    tReset();
  };

  //input field required
  return (
    <form onSubmit={formSubmitHandler} className="formContainer">
      <h3 className="title">BOOK YOUR APPOINTMENT</h3>
      <div className="inputRow">
        <div className="inputContainer">
          <input
            className="nameInput"
            value={fValue}
            onChange={fChangedHandler}
            onBlur={fBlurHandler}
            type="text"
            placeholder="First Name"
          ></input>
          {fHasError || lHasError ? (
            <p className="inputError">Please enter your full name</p>
          ) : (
            ''
          )}
        </div>

        <div className="inputContainer">
          <input
            className="nameInput"
            value={lValue}
            onChange={lChangedHandler}
            onBlur={lBlurHandler}
            type="text"
            placeholder="Last Name"
          ></input>
        </div>
      </div>
      <div className="inputRow">
        <div className="inputContainer">
          <input
            value={eValue}
            onChange={eChangedHandler}
            onBlur={eBlurHandler}
            type="text"
            placeholder="Email"
          ></input>
          {eHasError && <p className="inputError">Please enter valid email</p>}
        </div>
        <div className="inputContainer">
          <input
            value={pValue}
            onChange={pChangedHandler}
            onBlur={pBlurHandler}
            type="text"
            placeholder="Contact Number"
          ></input>
          {pHasError && <p className="inputError">Please enter phone number</p>}
        </div>
      </div>
      <div className="inputRow">
        <div className="selectContainer">
          <select
            value={bValue}
            onChange={bChangedHandler}
            onBlur={bBlurHandler}
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
          {bHasError && <p className="inputError">Please select a barber</p>}
        </div>
        <div className="selectContainer">
          <select
            value={sValue}
            onChange={sChangedHandler}
            onBlur={sBlurHandler}
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
          {sHasError && <p className="inputError">Please select a service</p>}
        </div>
      </div>
      <div className="inputRow">
        <div className="inputContainer">
          <input
            placeholder="Select Date"
            type="date"
            onChange={dChangedHandler}
            onBlur={dBlurHandler}
            value={dValue}
          ></input>
          {dHasError && <p className="inputError">Please pick a date</p>}
        </div>
        <div className="selectContainer">
          <select
            value={tValue}
            onChange={tChangedHandler}
            onBlur={tBlurHandler}
          >
            <option value="default" hidden>
              Select Time
            </option>
            <option value="closed" hidden>
              Closed
            </option>
            {dateInput.isValid &&
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
          {tHasError && <p className="inputError">Please pick a time</p>}
        </div>
      </div>
      <div>
        <input
          readOnly
          value={price}
          type="text"
          placeholder="Select a Service"
        ></input>
      </div>
      <button>{isPhone ? 'BOOK' : 'BOOK APPOINTMENT'}</button>
    </form>
  );
};

export default ContactForm;
