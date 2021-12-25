import React, { useEffect, useState } from 'react';
import ContactForm from '../Components/ContactForm';
import barberImg from '../Styles/image.jpg';
import '../Styles/css/Booking.css';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../Components/UI/LoadingSpinner';

const Booking = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [dbData, setDbData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    if (window.screen.width < 768) {
      setIsPhone(true);
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/db')
      .then((res) => {
        return res.json();
      })
      .then((data) => setDbData(data));
  }, []);

  const history = useHistory();

  const bookAppointment = async (appointment) => {
    try {
      const response = await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        body: JSON.stringify(appointment),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      console.log('Request sent!');
      console.log(data);

      history.push('/success');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="booking">
      <header>
        <h1 className="h1">BOOK YOUR BARBER</h1>
        <p>Great Hair Doesn't Happen By Chance. It Happens By Appointment!</p>
        {!isPhone && <p>So Don't Wait And Book Your Appointment Now</p>}
      </header>
      {dbData.length !== 0 ? (
        <div className="contentContainer">
          <div className="imageContainer">
            <img alt="barber" src={barberImg}></img>
          </div>
          <ContactForm
            servicesData={dbData.services}
            barbersData={dbData.barbers}
            appointmentsData={dbData.appointments}
            isPhone={isPhone}
            sendAppointment={bookAppointment}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Booking;
