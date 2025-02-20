document.addEventListener("DOMContentLoaded", () => {
    const placesContainer = document.getElementById("places-container");
    const visitMessage = document.getElementById("visitMessage");
    const jsonUrl = "data/places.json"; // Ensure your JSON file is in /data/

    // Store and display last visit message
    function displayVisitMessage() {
        const lastVisit = localStorage.getItem("lastVisit");
        const currentDate = new Date();

        if (lastVisit) {
            const lastVisitDate = new Date(lastVisit);
            const timeDiff = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));

            if (timeDiff === 0) {
                visitMessage.innerHTML = "<p>Welcome back! You visited today.</p>";
            } else {
                visitMessage.innerHTML = `<p>Welcome back! Your last visit was ${timeDiff} day(s) ago.</p>`;
            }
        } else {
            visitMessage.innerHTML = "<p>Welcome! This is your first visit.</p>";
        }

        localStorage.setItem("lastVisit", currentDate);
    }

    async function fetchPlaces() {
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            displayPlaces(data.places);
        } catch (error) {
            console.error("Error fetching places:", error);
            placesContainer.innerHTML = "<p>Failed to load places. Please try again later.</p>";
        }
    }

    function displayPlaces(places) {
        places.forEach(place => {
            const placeCard = document.createElement("article");
            placeCard.classList.add("place-card");

            placeCard.innerHTML = `
                <img src="${place.image}" alt="${place.name}" loading="lazy">
                <div class="place-info">
                    <h3>${place.name}</h3>
                    <p><strong>Address:</strong> ${place.address}</p>
                    <p><strong>Description:</strong> ${place.description}</p>
                    <p><strong>Cost:</strong> ${place.cost}</p>
                    <p><strong>Distance:</strong> ${place.distance}</p>
                    <button class="learn-more">Learn More</button>
                </div>
            `;

            placesContainer.appendChild(placeCard);
        });
    }

    displayVisitMessage();
    fetchPlaces();
});
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector(".nav-menu");

    menuIcon.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuIcon.classList.toggle("open"); // Optional: Change icon appearance when active
    });
});
