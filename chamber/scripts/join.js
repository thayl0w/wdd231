document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if (menuToggle) {
        menuToggle.addEventListener("change", () => {
            navMenu.classList.toggle("active", menuToggle.checked);
        });
    }
    
    // Dynamic Date in Footer
    const currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = currentYear;
    
    // Spotlight Section Animation
    const spotlightMembers = document.querySelectorAll(".spotlight .member");
    spotlightMembers.forEach(member => {
        member.addEventListener("mouseover", () => {
            member.style.transform = "translateY(-5px)";
        });
        member.addEventListener("mouseleave", () => {
            member.style.transform = "translateY(0)";
        });
    });
    
    // Directory View Toggle
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");
    const directoryContainer = document.getElementById("directory-container");
    
    if (gridViewButton && listViewButton) {
        gridViewButton.addEventListener("click", () => {
            directoryContainer.classList.remove("list-view");
        });
        listViewButton.addEventListener("click", () => {
            directoryContainer.classList.add("list-view");
        });
    }

    // Weather API Fetch (Example - Replace with actual API)
    const weatherContainer = document.getElementById("weather");
    if (weatherContainer) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YOUR_API_KEY&units=metric")
            .then(response => response.json())
            .then(data => {
                weatherContainer.innerHTML = `<p>${data.weather[0].description}, ${data.main.temp}°C</p>`;
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }
});
