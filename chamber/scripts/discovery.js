import { places } from "../data/discover.mjs";

console.log(places);

const container = document.querySelector("main"); // Ensure it selects the correct container

places.places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.imageUrl}" alt="${place.name}" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <p><strong>Cost:</strong> ${place.cost ? place.cost : "Not available"}</p>
        <p><strong>Distance:</strong> ${place.distance ? place.distance : "Not available"}</p>
        <button class="learn-more">Learn More</button>
    `;

    container.appendChild(card);
});
