document.addEventListener("DOMContentLoaded", function () {
    // Set current year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    const directoryContainer = document.getElementById("directory-container");

    if (directoryContainer) {
        fetch("data/members.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load business directory.");
                }
                return response.json();
            })
            .then(data => displayDirectory(data.members)) // Access "members" array
            .catch(error => {
                console.error("Error loading members:", error);
                directoryContainer.innerHTML = "<p>Directory data unavailable.</p>";
            });
    }

    // Toggle List/Grid View
    const toggleButton = document.getElementById("toggleView");
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            directoryContainer.classList.toggle("list-view");
        });
    }
});

function displayDirectory(members) {
    const container = document.getElementById("directory-container");
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    members.forEach(member => {
        const div = document.createElement("div");
        div.classList.add("directory-item");
        div.innerHTML = `
            <img src="${member.imageUrl}" alt="${member.name} Logo" class="business-logo">
            <h3>${member.name}</h3>
            <p><strong>Industry:</strong> ${member.industry}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        container.appendChild(div);
    });
}

// Converts membership level numbers into readable format
function getMembershipLevel(level) {
    const levels = {
        1: "Basic",
        2: "Silver",
        3: "Gold"
    };
    return levels[level] || "Unknown";
}
