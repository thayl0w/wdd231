document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("travel-container");

    try {
        const response = await fetch("data/travel.json"); // Fetch JSON data
        const travelSites = await response.json();

        travelSites.forEach(site => {
            const card = document.createElement("div");
            card.classList.add("travel-card");

            card.innerHTML = `
                <img src="${site.image}" alt="${site.name}" loading="lazy">
                <h2>${site.name}</h2>
                <p>${site.description}</p>
                <a href="${site.url}" target="_blank" class="visit-button">Visit Site</a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading travel sites:", error);
        container.innerHTML = "<p>Failed to load travel sites. Please try again later.</p>";
    }
});
