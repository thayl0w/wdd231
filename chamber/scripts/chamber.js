document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members");
    const toggleButton = document.getElementById("toggleView");
    let isGridView = true; // Default to grid view

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            displayMembers(data.members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const memberElement = document.createElement("div");
            memberElement.classList.add("card");
            memberElement.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div>
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `;
            membersContainer.appendChild(memberElement);
        });
    }

    // Toggle between grid and list view
    toggleButton.addEventListener("click", () => {
        isGridView = !isGridView;
        membersContainer.classList.toggle("list-view", !isGridView);
        toggleButton.textContent = isGridView ? "Switch to List View" : "Switch to Grid View";
    });

    // Add year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    fetchMembers();
});
