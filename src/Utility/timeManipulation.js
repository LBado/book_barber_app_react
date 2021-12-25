export const convertDateToUnix = (value) => {
  return parseInt((new Date(value).getTime() / 1000).toFixed(0));
};

export const convertDateToMs = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  const dateMs = date.getTime();
  return dateMs;
};

export const getTimeFromMs = (value) => {
  const time = new Date(value);
  const hours = time.getHours();
  const minutes = '0' + time.getMinutes();
  return hours + ':' + minutes.substr(-2);
};

export const getDateFromMs = (value) => {
  const time = new Date(value);
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  return year + '-' + month + '-' + day;
};

export const getMsFromTime = (value) =>{
  const data = value.split(':');
  const hours = (+data[0] * 60 * 60) * 1000;
  const minutes = (+data[1] * 60) * 1000;
  return hours + minutes; 
};

export const convertUnixToDate = (value) => {
  const date = new Date(value * 1000);
  const day = date.getDate();
  const month = '0' + (date.getMonth() + 1); //jan is 0
  const year = date.getFullYear();
  const readableDate = year + '-' + month.substr(-2) + '-' + day;

  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const readableTime = hours + ':' + minutes.substr(-2);

  date.setHours(0, 0, 0, 0);
  const dateMs = date.getTime();

  const formattedTime = {
    date: readableDate,
    dateMs: dateMs,
    time: readableTime,
  };

  return formattedTime;
};