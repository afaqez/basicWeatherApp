import {geocodingApiKey} from  './apiKey.js';
import { weatherApiKey } from './apiKey.js';

// function to get the long and lat
async function getCoordinates(address) {
    try {
        const response = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${geocodingApiKey}`);
        const data = await response.json();

        if (data && data.length > 0) {
            // console.log(data); // to check if I got the data or not
            const location = data[0];
            const latitude = location.lat;
            const longitude = location.lon;
            return { latitude, longitude };
        }
    } catch (error) {
        console.error('Error fetching coordinates: ', error);
        throw error;
    }
}


async function getWeatherData(longitude, latitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`);
        const data = await response.json();
        
        if (Object.keys(data).length > 0) {
            console.log(data); // to check if I got the data or not
            let temperature = 0;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            temperature = data.main.temp; // to convert kelvin -> celsius
            temperature = (temperature - 273.15).toFixed(2); // .toFixed added to vocab

            document.getElementById('humidityValue').textContent = humidity + '%';
            document.getElementById('windSpeedValue').textContent = windSpeed + ' km/h';
            document.getElementById('temperatureValue').textContent = temperature + '°C';
        }
        else{
            console.log('Abon');
        }
    } catch (error) {
        console.error('Error fetching coordinates: ', error);
        throw error;
    }
}

// get the input data of the user
const addressInput = document.getElementById('cityInput');
// document.getElementById('addressValue').textContent = addressInput;
const submitInput = document.getElementById('submitButton');
let longitude = null;
let latitude = null;


// this onClick function will be called each time user clicks the submit button
async function onClick(){
    const address = addressInput.value;
    let coordinates = null;
    try {
        coordinates = await getCoordinates(address);
    } catch (error) {
        console.error('Error fetching coordinates: ', error);
        throw(error);
    }
    console.log(coordinates.latitude, coordinates.longitude);
    longitude = coordinates.longitude;
    latitude = coordinates.latitude;
    getWeatherData(longitude, latitude);
}

// event listener will tell us when user clicks on the button
submitInput.addEventListener('click', onClick);

