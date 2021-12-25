import React, { useEffect, useState } from 'react';
import '../Styles/css/Success.css';

const Success = () => {
  const [gifData, setGifData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=KeTn0RgXZQF8EDkUGgQmSaJYuWPEz5mI&q=barber'
    )
      .then((res) => res.json())
      .then((data) => {
        setGifData(data);
        setImageUrl(
          data.data[Math.floor(Math.random() * 49)].images.downsized_medium.url
        );
      });
  }, []);

  const setRandomUrl = () => {
    setImageUrl(
      gifData.data[Math.floor(Math.random() * 49)].images.downsized_medium.url
    );
  };

  const imageClickHandler = () => {
    setRandomUrl();
  };

  return (
    <div className="success">
      <h1 className="title">Appointment successfully booked</h1>
      {imageUrl !== '' && (
        <div className="imageContainer">
          <img onClick={imageClickHandler} className="image" alt="Barber GIF" src={imageUrl}></img>
        </div>
      )}
    </div>
  );
};

export default Success;
