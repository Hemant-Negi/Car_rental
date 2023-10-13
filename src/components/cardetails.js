// src/CarDetails.js

import React, { useState, useEffect } from 'react';

const CarDetails = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    // Fetch car details from the server
    fetch('http://localhost:3000/getcars')
      .then(response => response.json())
      .then(data => setCarList(data))
      .catch(error => console.error('Error fetching data: ' + error));
  }, []);

  return (
    <div>
      <h1>Car Details</h1>
      <div>
        {carList.map(car => (
          <div key={car.car_id}>
            <h2>{car.make} {car.model} ({car.year})</h2>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Mileage:</strong> {car.mileage} miles</p>
            <p><strong>Price per Day:</strong> ${car.price_per_day.toFixed(2)}</p>
            <p><strong>Availability:</strong> {car.availability}</p>
            <p><strong>Description:</strong> {car.description}</p>
            <img src={car.image_url} alt="Car " width={600} height={600} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetails;
