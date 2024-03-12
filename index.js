const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

const cors = require('cors');
app.use(cors());

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

const car_data = require('./utils/Cleaned_Car_Dat');
// console.log(car_data);
console.log("Ankit car data");


// Load the machine learning model
const model = require('./LinearRegressionModel');

app.use(express.static(path.join(__dirname, 'public')));

console.log(car_data.length);

// Placeholder encoding functions (replace with your actual encoding logic)
function encodeCompany(company) {
    // Your encoding logic here
    return company; // Placeholder logic, modify as needed
}

function encodeCarModel(carModel) {
    // Your encoding logic here
    return carModel; // Placeholder logic, modify as needed
}

function encodeFuelType(fuelType) {
    // Your encoding logic here
    return fuelType; // Placeholder logic, modify as needed
}

app.get('/', (req, res) => {
    const viewsData = {
        Cleaned_Car_Dat: car_data,
        pageTitle: 'Home Page - Products List'
    };
    res.render('index', viewsData);
});

console.log("Ankit 2");

app.post('/predict', (req, res) => {
    console.log("Ankit 4");

    const { company, car_model, year, fuel_type, driven } = req.body;
    console.log("Ankit 5");

    // Convert driven to a number
    const drivenNumber = parseFloat(driven);
    console.log("Ankit 6");

    // Encode categorical variables
    const encodedCompany = encodeCompany(company);
    const encodedCarModel = encodeCarModel(car_model);
    const encodedFuelType = encodeFuelType(fuel_type);
    console.log("Ankit 7");

    // Handle missing or invalid data if needed

    // Make a prediction using the model
    const prediction = model.predict([encodedCarModel, encodedCompany, year, drivenNumber, encodedFuelType]);
    console.log("Ankit 8");

    // Check if prediction is a valid number
    if (!isNaN(prediction) && typeof prediction === 'number') {
        // Return the prediction
        res.send(prediction.toFixed(2));
    } else {
        // Handle the case where prediction is not a valid number
        res.status(500).send("Error: Invalid prediction value");
    }
    console.log("Ankit 9");


});
console.log("Ankit3");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
