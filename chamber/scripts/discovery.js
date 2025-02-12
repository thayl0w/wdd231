import { places } from "../data/discover.mjs";
console .log (places)

places.forEach(place => {
    const card = document.createElement("div");
    card.innerHTML = `
        <h2>${place.name}</h2>
        <img src="${place.imageUrl}" alt="${place.name}" width="300" height="200">
        <p>${place.description}</p>
    `;
    document.body.appendChild(card); // Or append to a specific div
});
