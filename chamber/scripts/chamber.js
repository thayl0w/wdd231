// Function to update the size of the spotlight section in CSS
function updateSpotlightSize(size) {
    document.documentElement.style.setProperty('--spotlight-width', size + '%');
}

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    // Add click event to the menu icon
    menuIcon.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });
    // Set the current year and last modified date in the footer
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // Fetch and display the directory members if the directory-container exists
    const directoryContainer = document.getElementById("directory-container");
    if (directoryContainer) {
        fetch("data/members.json")
            .then(response => {
                console.log("Fetched members.json");
                return response.json();
            })
            .then(data => {
                console.log("JSON data parsed:", data);
                displayDirectory(data.members);
            })
            .catch(error => {
                console.error("Error loading members:", error);
                directoryContainer.innerHTML = "<p>Directory data unavailable.</p>";
            });
    }

    // Fetch and display the spotlight members if the spotlight-container exists
    const spotlightContainer = document.getElementById("spotlight-container");
    if (spotlightContainer) {
        fetch("data/members.json")
            .then(response => {
                console.log("Fetched members.json for spotlight");
                return response.json();
            })
            .then(data => {
                console.log("JSON data parsed for spotlight:", data);
                displaySpotlightMembers(data.members);
            })
            .catch(error => {
                console.error("Error loading members for spotlight:", error);
                spotlightContainer.innerHTML = "<p>Spotlight data unavailable.</p>";
            });
    }

    // Toggle the view of the directory list if the toggle button exists
    const toggleButton = document.getElementById("toggleView");
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            directoryContainer.classList.toggle("list-view");
        });
    }

    // Initialize IntersectionObserver for scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animated-element');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-triggered');
                observer.unobserve(entry.target);
            }
        });
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Function to display the directory members
function displayDirectory(members) {
    const container = document.getElementById("directory-container");
    if (!container) return;

    container.innerHTML = "";
    members.forEach(member => {
        const div = document.createElement("div");
        div.classList.add("directory-item", "animated-element");
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

// Function to get the membership level name based on the level number
function getMembershipLevel(level) {
    const levels = { 1: "Basic", 2: "Silver", 3: "Gold" };
    return levels[level] || "Unknown";
}

// Function to display spotlight members
function displaySpotlightMembers(members) {
    // Filter to get only Gold and Silver members
    const goldSilverMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
    console.log("Filtered gold and silver members:", goldSilverMembers);

    // Select 2 random spotlight members
    const selectedMembers = [];
    const numMembersToSelect = 2;  // Show only 2 spotlight members
    while (selectedMembers.length < numMembersToSelect) {
        const randomIndex = Math.floor(Math.random() * goldSilverMembers.length);
        selectedMembers.push(goldSilverMembers.splice(randomIndex, 1)[0]);
    }

    console.log("Selected spotlight members:", selectedMembers);

    // Display the selected spotlight members
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = "";
    selectedMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member', 'animated-element');
        memberDiv.innerHTML = `
            <img src="${member.imageUrl}" alt="${member.name}" class="business-logo">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Industry:</strong> ${member.industry}</p>
        `;
        spotlightContainer.appendChild(memberDiv);
    });
}
