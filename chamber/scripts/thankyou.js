
document.addEventListener("DOMContentLoaded", function () {
    const detailsContainer = document.getElementById("submission-details");
    const timestampDisplay = document.getElementById("display-timestamp").querySelector("span");

  
    const params = new URLSearchParams(window.location.search);

    if (params.has("timestamp")) {
        timestampDisplay.textContent = params.get("timestamp");
    } else {
        timestampDisplay.textContent = "Not available";
    }

   
    params.forEach((value, key) => {
        if (key !== "timestamp") { 
            const p = document.createElement("p");
            p.innerHTML = `<strong>${key.replace("-", " ")}:</strong> ${decodeURIComponent(value)}`;
            detailsContainer.appendChild(p);
        }
    });
});
