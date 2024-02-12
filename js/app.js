document.addEventListener('DOMContentLoaded', function () {
    const weatherData = [
        { city: "New York", temperature: 25, conditions: "Sunny" },
        { city: "London", temperature: 15, conditions: "Cloudy" },
        { city: "Tokyo", temperature: 20, conditions: "Rainy" },
        { city: "Paris", temperature: 18, conditions: "Windy" },
        { city: "Berlin", temperature: 16, conditions: "Overcast" },
        { city: "Sydney", temperature: 22, conditions: "Sunny" },
        { city: "Moscow", temperature: 10, conditions: "Snowy" },
        { city: "Rio de Janeiro", temperature: 30, conditions: "Sunny" },
        { city: "Toronto", temperature: 12, conditions: "Rainy" },
        { city: "Beijing", temperature: 24, conditions: "Smoggy" },
        { city: "Mumbai", temperature: 28, conditions: "Humid" },
        { city: "Cairo", temperature: 35, conditions: "Sunny" },
        { city: "Johannesburg", temperature: 20, conditions: "Dry" },
        { city: "Los Angeles", temperature: 25, conditions: "Foggy" },
        { city: "Dubai", temperature: 40, conditions: "Sunny" },
        { city: "Mexico City", temperature: 18, conditions: "Cloudy" },
    ];

    const locationSelector = document.getElementById('locationSelector');
    const locationName = document.getElementById('locationName');
    const temperatureDisplay = document.getElementById('temperature');
    const conditionsDisplay = document.getElementById('conditions');
    const convertTempButton = document.getElementById('convertTemp');
    const submitButton = document.getElementById('submitButton');
    const highestTempDisplay = document.getElementById('highestTemp');
    const lowestTempDisplay = document.getElementById('lowestTemp');
    const locationInput = document.getElementById('locationInput');
    const locationsDatalist = document.getElementById('locations');
    let isCelsius = true;
    var location;

    function updateExtremeTemperatures() {
        const temperatures = weatherData.map(data => data.temperature);
        const highestTemp = Math.max(...temperatures);
        const lowestTemp = Math.min(...temperatures);
        const highestTempCity = weatherData.find(data => data.temperature === highestTemp).city;
        const lowestTempCity = weatherData.find(data => data.temperature === lowestTemp).city;

        highestTempDisplay.textContent = `Highest Temp: ${highestTemp} °C in ${highestTempCity}`;
        lowestTempDisplay.textContent = `Lowest Temp: ${lowestTemp} °C in ${lowestTempCity}`;
    }
    weatherData.forEach((data, index) => {
        const option = document.createElement('option');
        option.value = data.city;
        locationsDatalist.appendChild(option);
    });
    if (localStorage.getItem("data")) {
        locationInput.value = localStorage.getItem("data");
        const selectedData = weatherData.find(data => data.city === locationInput.value);
        if (selectedData) {
            locationName.textContent = `Location: ${selectedData.city}`;
            temperatureDisplay.textContent = `Temperature: ${selectedData.temperature} °C`;
            conditionsDisplay.textContent = `Conditions: ${selectedData.conditions}`;
        }
    }

    submitButton.addEventListener('click', function () {
        const selectedData = weatherData.find(data => data.city === locationInput.value);

        if (selectedData) {
            localStorage.setItem("data", selectedData.city);
            locationName.textContent = `Location: ${selectedData.city}`;
            temperatureDisplay.textContent = `Temperature: ${selectedData.temperature} °C`;
            conditionsDisplay.textContent = `Conditions: ${selectedData.conditions}`;

        }
        else {
            locationName.textContent = `Location: -`;
            temperatureDisplay.textContent = `Temperature: -`;
            conditionsDisplay.textContent = `Conditions: -`;
            alert("Invalid Location Selected");
        }
    });


    convertTempButton.addEventListener('click', function () {
        const selectedData = weatherData.find(data => data.city === locationInput.value);
        if (selectedData.city) {
            if (isCelsius) {
                const fahrenheit = (selectedData.temperature * 9 / 5) + 32;
                temperatureDisplay.textContent = `Temperature: ${fahrenheit.toFixed(1)} °F`;
            } else {
                const celsius = selectedData.temperature;
                temperatureDisplay.textContent = `Temperature: ${celsius.toFixed(1)} °C`;
            }
            isCelsius = !isCelsius;
        } else {
            alert('Please select a location first.');
        }
    });

    updateExtremeTemperatures();
});
