document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members");
    const apiKey = "fb7d38f56f21ee35d1914a39d838bafc";  // Replace with your actual API key
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
            const membershipLevel = getMembershipLevel(member.membershipLevel);
            const memberElement = document.createElement("div");
            memberElement.classList.add("card");
            memberElement.innerHTML = `
                <img src="${member.imageUrl}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership Level:</strong> <span class="${membershipLevel.toLowerCase()}">${membershipLevel}</span></p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            membersContainer.appendChild(memberElement);
        });
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 1: return "Bronze";
            case 2: return "Silver";
            case 3: return "Gold";
            default: return "Unknown";
        }
    }

    async function fetchWeather() {
        try {
            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) throw new Error(`Weather API error! Status: ${weatherResponse.status}`);
            const weatherData = await weatherResponse.json();
            
            document.getElementById("currentWeather").textContent = `${weatherData.weather[0].description}, ${weatherData.main.temp}°C`;
            document.getElementById("weatherDetails").textContent = `High: ${weatherData.main.temp_max}°C | Low: ${weatherData.main.temp_min}°C`;
            document.getElementById("humidity").textContent = `Humidity: ${weatherData.main.humidity}%`;

            const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            const weatherIconElement = document.createElement("img");
            weatherIconElement.src = weatherIcon;
            weatherIconElement.alt = weatherData.weather[0].description;
            document.getElementById("currentWeather").appendChild(weatherIconElement);

            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) throw new Error(`Forecast API error! Status: ${forecastResponse.status}`);
            const forecastData = await forecastResponse.json();
            
            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = "<h3>Weather Forecast</h3>";
            forecastData.list.slice(0, 5).forEach(item => {
                const forecastIcon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                forecastContainer.innerHTML += `<p>${new Date(item.dt_txt).toLocaleDateString()}: ${item.main.temp}°C, ${item.weather[0].description} <img src="${forecastIcon}" alt="${item.weather[0].description}"></p>`;
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById("currentWeather").textContent = "Weather data unavailable";
            document.getElementById("weatherDetails").textContent = "High: --°C | Low: --°C";
            document.getElementById("humidity").textContent = "Humidity: --%";
            document.getElementById("forecast").innerHTML = "<h3>Weather Forecast</h3><p>Forecast data unavailable.</p>";
        }
    }

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    fetchMembers();
    fetchWeather();

    // Add event listener for Keynote Tickets button
    const keynoteButton = document.querySelector(".hero-btn");
    keynoteButton.addEventListener("click", () => {
        alert("Keynote Tickets are now available! Please contact the Chamber of Commerce for more details.");
    });

    // Add event listeners for navigation buttons
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Toggle Button for Directory View
    const toggleButton = document.getElementById("toggleDirectoryView");
    toggleButton.addEventListener("click", () => {
        const membersSection = document.getElementById("members");
        membersSection.classList.toggle("list-view");
    });
});
