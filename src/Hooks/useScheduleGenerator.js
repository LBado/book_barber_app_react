import { useEffect, useState } from 'react';
import { convertUnixToDate } from '../Utility/timeManipulation';

const useScheduleGenerator = (
  bValue,
  dValue,
  sValue,
  dIsValid,
  bIsValid,
  sIsValid,
  appointmentsData,
  barbersData,
  servicesData
) => {
  const [timeSchedule, setTimeSchedule] = useState([]);

  useEffect(() => {
    if (dIsValid && bIsValid && sIsValid) {
      //get day from selected date (sun is 0)
      const dateDay = new Date(dValue).getDay();
      console.log('Selected day: ' + dateDay);

      //get selected barber
      const selectedBarber = barbersData.find(
        (barber) => barber.id === parseInt(bValue)
      );
      console.log('Selected barber: ' + selectedBarber);

      let barWorkHours = [];
      let daySchedule = [{ id: 0, time: 'closed', status: 'closed' }];

      //sun/sat filter
      if (dateDay !== 0 && dateDay !== 6) {
        //get work hours for day
        barWorkHours = selectedBarber.workHours.find(
          (workDay) => workDay.day === dateDay
        );

        let isAM = true;
        if (barWorkHours.startHour === 12) {
          isAM = false;
        }

        //create default schedule
        const generateSchedule = (isAm) => {
          const hFrom = isAm ? 6 : 11;
          const hTo = isAM ? 14 : 19;
          // const cHour = isAM ? 19 : 14;
          const scheduleMs = [];
          const scheduleTime = [];
          const daySchedule = [];

          for (let i = hFrom; i < hTo + 1; i++) {
            if (i === hTo) {
              let hours = i * 60 * 60 * 1000;
              let minutes = 0 * 5 * 60 * 1000;
              scheduleMs.push(hours + minutes);
              break;
            }
            let hours = i * 60 * 60 * 1000;
            let minutes = 0;
            for (let j = 0; j < 12; j++) {
              minutes = j * 5 * 60 * 1000;
              scheduleMs.push(hours + minutes);
            }
          }

          scheduleMs.forEach((timeMs) => {
            const parsedTime = parseInt(timeMs);
            const date = new Date(parsedTime);
            const hours = date.getHours();
            const minutes = '0' + date.getMinutes();
            const formattedTime = hours + ':' + minutes.substr(-2);
            scheduleTime.push(formattedTime);
          });

          scheduleTime.forEach((time, index) => {
            daySchedule.push({
              id: index,
              time: time,
              status: 'free',
            });
          });

          return daySchedule;
        };
        //generate schedule
        daySchedule = generateSchedule(isAM);

        //get selected date and service
        const selectedDate = dValue;
        const selectedService = servicesData.find(
          (service) => service.id === +sValue
        );

        //generate appointments array from unix->readable date
        const appointmentsFormatted = [];
        appointmentsData.forEach((appointment) => {
          const appointmentFormatted = convertUnixToDate(appointment.startDate);
          const appointmentTime = appointmentFormatted.time;
          const appointmentDate = appointmentFormatted.date;

          const serviceMin = servicesData.find(
            (service) => service.id === appointment.serviceId
          ).durationMinutes;

          if (selectedDate === appointmentDate) {
            const appointment = {
              date: appointmentDate,
              time: appointmentTime,
              serviceMin: serviceMin,
            };

            appointmentsFormatted.push(appointment);
          }
        });
        console.log('Formatted appointments: ');
        console.log(appointmentsFormatted);

        daySchedule.forEach((schedule, index) => {
          const scheduleTime = schedule.time;
          const selectedSIndex = selectedService.durationMinutes / 5;

          const appointment = appointmentsFormatted.find(
            (appointment) => appointment.time === scheduleTime
          );

          //populate day schedule with appointments if there are
          if (appointment !== undefined) {
            schedule.status = 'unavailable';
            const serviceIndex = appointment.serviceMin / 5;

            //unavailable for appointments + duration
            for (let i = 0; i < serviceIndex; i++) {
              daySchedule[index + i].status = 'unavailable';
            }

            for (let i = 0; i < selectedSIndex; i++) {
              if (!daySchedule[index - i]) {
                break;
              }
              //no time if selected service overlaps with previous services
              if (daySchedule[index - i].status === 'free') {
                daySchedule[index - i].status = 'no time';
              } else {
                continue;
              }
            }
          }

          //no time if service takes longer than barber is working
          if (index === daySchedule.length - 1) {
            for (let i = 0; i < selectedSIndex; i++) {
              if (daySchedule[index - i].status === 'free') {
                daySchedule[index - i].status = 'no time';
              } else {
                continue;
              }
            }
          }

          //break for lunch
          const lunchStart = barWorkHours.lunchTime.startHour + ':00';
          const lunchDurationIndex = barWorkHours.lunchTime.durationMinutes / 5;
          if (schedule.time === lunchStart) {
            for (let i = 0; i < lunchDurationIndex; i++) {
              daySchedule[index + i].status = 'break';
            }

            for (let i = 1; i < selectedSIndex; i++) {
              if ((daySchedule[index - i].status = 'free')) {
                daySchedule[index - i].status = 'unavailable';
              }
            }
          }

          setTimeSchedule(daySchedule);
        });
      } else {
        setTimeSchedule(daySchedule);
      }
      console.log('Day schedule: ');
      console.log(daySchedule);
    }
  }, [
    bValue,
    dValue,
    sValue,
    dIsValid,
    bIsValid,
    sIsValid,
    appointmentsData,
    barbersData,
    servicesData,
  ]);

  return { timeSchedule };
};

export default useScheduleGenerator;
