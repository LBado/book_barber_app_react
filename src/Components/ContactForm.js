import React, { useState } from 'react';
import useScheduleGenerator from '../Hooks/useScheduleGenerator';
import '../Styles/css/ContactForm.css';
import '../Styles/css/Error.css';
import {
  convertDateToMs,
  convertDateToUnix,
  getMsFromTime,
} from '../Utility/timeManipulation';
import InputRow from './InputRow';
import BarberSelect from './Inputs/BarberSelect';
import DateInput from './Inputs/DateInput';
import EmailInput from './Inputs/EmailInput';
import LNameInput from './Inputs/LNameInput';
import NameInput from './Inputs/NameInput';
import PhoneInput from './Inputs/PhoneInput';
import PriceInput from './Inputs/PriceInput';
import ServiceSelect from './Inputs/ServiceSelect';
import TimeSelect from './Inputs/TimeSelect';

const ContactForm = ({
  barbersData,
  servicesData,
  appointmentsData,
  isPhone,
  sendAppointment,
}) => {
  const [phoneInput, setPhoneInput] = useState({});
  const [nameInput, setNameInput] = useState({});
  const [lNameInput, setLNameInput] = useState({});
  const [emailInput, setEmailInput] = useState({});
  const [barberSelect, setBarberSelect] = useState({});
  const [serviceSelect, setServiceSelect] = useState({});
  const [dateInput, setDateInput] = useState({});
  const [timeSelect, setTimeSelect] = useState({});
  const [priceInput, setPriceInput] = useState({});

  const { timeSchedule } = useScheduleGenerator(
    barberSelect.selectedValue,
    dateInput.selectedValue,
    serviceSelect.selectedValue,
    dateInput.isValid,
    barberSelect.isValid,
    serviceSelect.isValid,
    appointmentsData,
    barbersData,
    servicesData
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const valids = [
      nameInput.isValid,
      lNameInput.isValid,
      emailInput.isValid,
      phoneInput.isValid,
      barberSelect.isValid,
      serviceSelect.isValid,
      dateInput.isValid,
      timeSelect.isValid,
    ];

    const fields = [
      nameInput,
      lNameInput,
      emailInput,
      phoneInput,
      barberSelect,
      serviceSelect,
      dateInput,
      timeSelect,
    ];

    if (valids.some((i) => i === false)) {
      console.log('Form NOT valid');
      console.log(valids);
      fields.forEach((field) => {
        if (!field.isValid && !field.isTouched) {
          field.blurFn();
        }
      });
      return;
    }

    console.log('Form IS valid');
    const barberId = barberSelect.selectedValue;
    const serviceId = serviceSelect.selectedValue;
    const date = convertDateToMs(dateInput.selectedValue);
    const time = getMsFromTime(timeSchedule[timeSelect.selectedValue].time);
    const unixDate = convertDateToUnix(time + date);

    const appointmentObj = {
      startDate: +unixDate,
      barberId: +barberId,
      serviceId: +serviceId,
    };

    console.log(appointmentObj);
    sendAppointment(appointmentObj);

    //reset
    priceInput.reset();
    fields.forEach((field) => field.resetFn());
  };

  //input field required
  return (
    <form onSubmit={formSubmitHandler} className="formContainer">
      <h3 className="title">BOOK YOUR APPOINTMENT</h3>
      <InputRow>
        <NameInput
          setNameInput={setNameInput}
          lHasError={lNameInput.hasError}
        />
        <LNameInput setLNameInput={setLNameInput} />
      </InputRow>
      {nameInput.hasError || lNameInput.hasError ? (
        <p className="nameInputError">Please enter your full name</p>
      ) : (
        ''
      )}
      <InputRow>
        <EmailInput setEmailInput={setEmailInput} />
        <PhoneInput setPhoneInput={setPhoneInput} />
      </InputRow>
      <InputRow>
        <BarberSelect
          barbersData={barbersData}
          setBarberSelect={setBarberSelect}
        />
        <ServiceSelect
          servicesData={servicesData}
          setServiceSelect={setServiceSelect}
        />
      </InputRow>
      <InputRow>
        <DateInput setDateInput={setDateInput} />
        <TimeSelect
          timeSchedule={timeSchedule}
          dateIsWeekend={dateInput.isWeekend}
          dateIsValid={dateInput.isValid}
          setTimeSelect={setTimeSelect}
        />
      </InputRow>
      <PriceInput
        servicesData={servicesData}
        serviceValue={serviceSelect.selectedValue}
        dateIsWeekend={dateInput.isWeekend}
        dateIsValid={dateInput.isValid}
        setPriceInput={setPriceInput}
      />
      <button>{isPhone ? 'BOOK' : 'BOOK APPOINTMENT'}</button>
    </form>
  );
};

export default ContactForm;
