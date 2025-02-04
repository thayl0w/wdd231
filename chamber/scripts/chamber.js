document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members");
    const toggleButton = document.getElementById("toggleView");
    let isGridView = true;

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
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <img src="images/${member.image}" alt="${member.name}" width="100">
            `;
            membersContainer.appendChild(memberElement);
        });
    }

    toggleButton.addEventListener("click", () => {
        isGridView = !isGridView;
        membersContainer.classList.toggle("list-view", !isGridView);
    });

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    fetchMembers();
});
