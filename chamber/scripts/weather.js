const apiKey = "fb7d38f56f21ee35d1914a39d838bafc";
const city = "Manila";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById("currentWeather").textContent = `${data.main.temp}°C - ${data.weather[0].description}`;
    })
    .catch(error => console.error("Error fetching weather:", error));
