document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members");
    const apiKey = "YOUR_API_KEY"; 
    const city = "Manila";
    const country = "PH";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error("Error fetching members:", error);
            membersContainer.innerHTML = "<p>Failed to load members. Please try again later.</p>";
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const memberElement = document.createElement("div");
            memberElement.classList.add("card");
            memberElement.innerHTML = `
                <img src="${member.imageUrl}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            membersContainer.appendChild(memberElement);
        });
    }

    async function fetchWeather() {
        try {
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            document.getElementById("currentWeather").textContent = `${weatherData.weather[0].description}, ${weatherData.main.temp}°C`;
            document.getElementById("weatherDetails").textContent = `High: ${weatherData.main.temp_max}°C | Low: ${weatherData.main.temp_min}°C`;
            document.getElementById("humidity").textContent = `Humidity: ${weatherData.main.humidity}%`;

            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = "<h3>Weather Forecast</h3>";
            forecastData.list.slice(0, 5).forEach(item => {
                forecastContainer.innerHTML += `<p>${new Date(item.dt_txt).toLocaleDateString()}: ${item.main.temp}°C, ${item.weather[0].description}</p>`;
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    fetchMembers();
    fetchWeather();
});
