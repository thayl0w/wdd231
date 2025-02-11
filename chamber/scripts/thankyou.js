// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const detailsContainer = document.getElementById("submission-details");
    const timestampDisplay = document.getElementById("display-timestamp").querySelector("span");

    // Get query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    if (params.has("timestamp")) {
        timestampDisplay.textContent = params.get("timestamp");
    } else {
        timestampDisplay.textContent = "Not available";
    }

    // Loop through form fields and display them
    params.forEach((value, key) => {
        if (key !== "timestamp") { // Exclude timestamp from main details
            const p = document.createElement("p");
            p.innerHTML = `<strong>${key.replace("-", " ")}:</strong> ${decodeURIComponent(value)}`;
            detailsContainer.appendChild(p);
        }
    });
});
