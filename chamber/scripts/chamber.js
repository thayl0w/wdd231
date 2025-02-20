document.addEventListener("DOMContentLoaded", function () {
    // Set the hidden timestamp field to the current date and time if the form exists
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

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
            .then(response => response.json())
            .then(data => {
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
            .then(response => response.json())
            .then(data => {
                displaySpotlightMembers(data.members);
            })
            .catch(error => {
                console.error("Error loading members for spotlight:", error);
                spotlightContainer.innerHTML = "<p>Spotlight data unavailable.</p>";
            });
    }

    // Fetch and display the places of interest
    const placesContainer = document.getElementById("places-container");
    if (placesContainer) {
        fetch("data/places.json")
        .then(response => response.json())
        .then(data => {
            console.log("Places data:", data); // Debug log
            displayPlaces(data.places);
        })
        .catch(error => {
            console.error("Error loading places:", error);
            placesContainer.innerHTML = "<p>Places data unavailable.</p>";
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

    // Fetch and display places
    function displayPlaces(places) {
        const placesContainer = document.getElementById("places-container");
        if (!placesContainer) return;
    
        placesContainer.innerHTML = "";
        places.forEach((place, index) => {
            const placeDiv = document.createElement("div");
            placeDiv.classList.add("place-card");
            placeDiv.innerHTML = `
                <figure>
                    <img src="${place.image}" alt="${place.name}" class="place-image" loading="lazy">
                    <figcaption>${place.name}</figcaption>
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <p><strong>Cost:</strong> ${place.cost}</p>
                <p><strong>Distance:</strong> ${place.distance}</p>
                <button class="learn-more" data-modal-id="modal-${index}" onclick="showModal('modal-${index}')">Learn More</button>
                <div id="modal-${index}" class="modal">
                    <div class="modal-content">
                        <span class="close" onclick="closeModal('modal-${index}')">&times;</span>
                        <h2>${place.name}</h2>
                        <p>${place.description}</p>
                        <p><strong>Address:</strong> ${place.address}</p>
                        <p><strong>Cost:</strong> ${place.cost}</p>
                        <p><strong>Distance:</strong> ${place.distance}</p>
                    </div>
                </div>
            `;
            placeDiv.style.gridArea = `card${index + 1}`;
            placesContainer.appendChild(placeDiv);
        });
    }
    
    // Function to show modal
    window.showModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
        }
    };

    // Function to close modal
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Close modal if clicking outside of modal content
    window.addEventListener("click", function (event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Visit tracking feature
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! This is your first time visiting this page.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const diffTime = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24)); // Days difference

        if (diffTime < 1) {
            visitMessage.textContent = "Welcome back! You last visited today.";
        } else {
            visitMessage.textContent = `Welcome back! You last visited ${diffTime} day(s) ago.`;
        }
    }

    localStorage.setItem('lastVisit', now);

    // Functions to handle the directory members and spotlight members display
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

    function getMembershipLevel(level) {
        const levels = { 1: "Basic", 2: "Silver", 3: "Gold" };
        return levels[level] || "Unknown";
    }

    function displaySpotlightMembers(members) {
        const goldSilverMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        const selectedMembers = [];
        const numMembersToSelect = 2;
        while (selectedMembers.length < numMembersToSelect) {
            const randomIndex = Math.floor(Math.random() * goldSilverMembers.length);
            selectedMembers.push(goldSilverMembers.splice(randomIndex, 1)[0]);
        }

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
});
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu functionality
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector(".nav-menu");

    menuIcon.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});
