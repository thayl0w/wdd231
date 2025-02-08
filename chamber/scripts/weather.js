const apiKey = "fb7d38f56f21ee35d1914a39d838bafc";
const city = "Manila";
let useCelsius = false; // Default to Fahrenheit

function fetchWeather() {
    const unit = useCelsius ? "metric" : "imperial";
    const unitSymbol = useCelsius ? "°C" : "°F";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            document.getElementById("currentWeather").innerHTML = `
                <div class="weather-header">Current Weather</div>
                <div class="weather-content">
                    <img src="${iconUrl}" alt="Weather Icon">
                    <p class="temp">${Math.round(data.main.temp)}${unitSymbol}</p>
                    <p>${data.weather[0].description}</p>
                    <p>High: ${Math.round(data.main.temp_max)}${unitSymbol}</p>
                    <p>Low: ${Math.round(data.main.temp_min)}${unitSymbol}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Sunrise: ${sunriseTime}</p>
                    <p>Sunset: ${sunsetTime}</p>
                </div>
            `;
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = `<div class="weather-header">Weather Forecast</div>`;

            const dailyForecasts = {};
            data.list.forEach(entry => {
                const date = entry.dt_txt.split(" ")[0];
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = entry;
                }
            });

            const forecastKeys = Object.keys(dailyForecasts).slice(0, 3);
            forecastKeys.forEach((date, index) => {
                const entry = dailyForecasts[date];
                const dayName = index === 0 ? "Today" : new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

                forecastContainer.innerHTML += `
                    <p class="forecast-item">${dayName}: <span class="temp-bold">${Math.round(entry.main.temp)}${unitSymbol}</span></p>
                `;
            });
        });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
    
    // Display last modified date
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
});
