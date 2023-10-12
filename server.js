// const mysql = require('mysql2');
// const fs = require('fs');

// // Create a MySQL database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Hemu@2024',
//   database: 'Rental_system',
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database: ' + err.stack);
//     return;
//   }
//   console.log('Connected to the database as ID ' + connection.threadId);
// });

// // Read the image from a local file

// // Insert data into the "cars" table
// // const carData = {
// //   car_id:'101',
// //   make: 'Chevrolet',
// //   model: 'Malibu',
// //   year: 2019,
// //   color: 'Gray',
// //   mileage: 35000,
// //   price_per_day: 45.00,
// //   availability: 'available',
// //   description: 'Mid-sized sedan with great fuel economy',
// //   image_url: 'https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-Chevrolet-Malibu-Shadow-Gray-Metallic-Color.jpeg',
// // };

// // connection.query('INSERT INTO cars_data SET ?', carData, (err, results) => {
// //   if (err) {
// //     console.error('Error inserting data: ' + err.message);
// //   } else {
// //     console.log('Inserted data with ID: ' + results.insertId);
// //   }
// // });

// app.get('/getcars', async (req, res) => {
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.query('SELECT * FROM cars');
//         connection.release();
//         res.json(rows);
//     } catch (error) {
//         console.error('Error fetching data: ' + error);
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// });

// app.use(express.static('public')); // Serve static files from a 'public' folder

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// // Close the database connection
// connection.end();
const express = require('express');
const mysql = require('mysql2/promise'); // Use 'mysql2/promise' for async/await
const cors = require('cors'); // Import the cors package


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


// Create a MySQL database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Hemu@2024',
    database: 'Rental_system',
});

// Serve static files from a 'public' folder
app.use(express.static('public'));

app.get('/getcars', async (req, res) => {
    console.log('call happend');
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM cars_data');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data: ' + error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

//insert data to mysql
app.post('/insertcar', async (req, res) => {
    try {
        const carData = req.body;
        // console.log(carData);

        const connection = await pool.getConnection();
        const sql = 'INSERT INTO cars_data(car_id,make, model, year, color, mileage, price_per_day, availability, description, image_url) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            carData.car_id,
            carData.make,
            carData.model,
            carData.year,
            carData.color,
            carData.mileage,
            carData.price_per_day,
            carData.availability,
            carData.description,
            carData.image_url,
        ];

        await connection.execute(sql, values);
        connection.release();

        console.log('Car details inserted successfully.');
        res.status(200).json({ message: 'Car details inserted successfully' });
    } catch (error) {
        console.error('Error inserting car details:', error);
        res.status(500).json({ error: 'Error inserting car details' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
