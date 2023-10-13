import React, { useState } from 'react';

function CarInsert() {
  const initialCarData = {
    car_id: '',
    make: '',
    model: '',
    year: '',
    color: '',
    mileage: '',
    price_per_day: '',
    availability: '',
    description: '',
    image_url: '',
  };
  const [carData, setCarData] = useState(initialCarData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/insertcar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        console.log('Car details inserted successfully.');
        setCarData(initialCarData);
        // Clear the form or perform other actions here on success
      } else {
        console.error('Error inserting car details.');
      }
    } catch (error) {
      console.error('Error inserting car details: ' + error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Insert Car Details</h2>
      <form onSubmit={handleSubmit}>
        <label>CarID:
          <input type="text" name="car_id" value={carData.car_id} onChange={handleInputChange} />
        </label>
        <label>Make:
          <input type="text" name="make" value={carData.make} onChange={handleInputChange} />
        </label>
        <label>Model:
          <input type="text" name="model" value={carData.model} onChange={handleInputChange} />
        </label>
        <label>Year:
          <input type="number" name="year" value={carData.year} onChange={handleInputChange} />
        </label>
        <label>Color:
          <input type="text" name="color" value={carData.color} onChange={handleInputChange} />
        </label>
        <label>Mileage:
          <input type="number" name="mileage" value={carData.mileage} onChange={handleInputChange} />
        </label>
        <label>Price per Day:
          <input type="number" name="price_per_day" value={carData.price_per_day} onChange={handleInputChange} />
        </label>
        <label>Availability:
          <input type="text" name="availability" value={carData.availability} onChange={handleInputChange} />
        </label>
        <label>Description:
          <input type="text" name="description" value={carData.description} onChange={handleInputChange} />
        </label>
        <label>Image URL:
          <input type="text" name="image_url" value={carData.image_url} onChange={handleInputChange} />
        </label>
        <button type="submit">Insert Car</button>
      </form>
    </div>
  );
}

export default CarInsert;
