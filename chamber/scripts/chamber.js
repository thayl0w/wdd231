// Function to update the size of the spotlight section in CSS
function updateSpotlightSize(size) {
    document.documentElement.style.setProperty('--spotlight-width', size + '%');
}

// Function to handle visitor message using localStorage
document.addEventListener("DOMContentLoaded", function () {
    const visitMessage = document.getElementById("visitMessage");
    if (visitMessage) {
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();

        if (!lastVisit) {
            visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
            if (daysPassed < 1) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else {
                visitMessage.textContent = `You last visited ${daysPassed} ${daysPassed === 1 ? "day" : "days"} ago.`;
            }
        }
        localStorage.setItem("lastVisit", now);
    }

    // Lazy loading images
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
    });

    // Set the current year and last modified date in the footer
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // Responsive menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    menuIcon.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Fetch and display the places of interest if the container exists
    const placesContainer = document.getElementById("directory-container");
    if (placesContainer) {
        fetch("data/discover.json")
            .then(response => response.json())
            .then(data => {
                displayPlaces(data.places);
            })
            .catch(error => {
                console.error("Error loading places:", error);
                placesContainer.innerHTML = "<p>Places data unavailable.</p>";
            });
    }

    // IntersectionObserver for animations
    const animatedElements = document.querySelectorAll('.animated-element');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-triggered');
                observer.unobserve(entry.target);
            }
        });
    });
    animatedElements.forEach(element => observer.observe(element));

    // Modal functionality
    const learnMoreButtons = document.querySelectorAll(".learn-more");
    const modals = document.querySelectorAll(".modal");
    learnMoreButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal-id");
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = "flex";
        });
    });

    modals.forEach(modal => {
        const closeButton = modal.querySelector(".close");
        if (closeButton) {
            closeButton.addEventListener("click", function () {
                modal.style.display = "none";
            });
        }
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

// Function to display the places of interest
function displayPlaces(places) {
    const container = document.getElementById("directory-container");
    if (!container) return;
    container.innerHTML = "";
    places.forEach(place => {
        const div = document.createElement("div");
        div.classList.add("directory-item", "animated-element");
        div.innerHTML = `
            <figure>
                <img src="${place.imageUrl}" alt="${place.name}" class="place-image" loading="lazy">
            </figure>
            <h2>${place.name}</h2>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more">Learn More</button>
        `;
        container.appendChild(div);
    });
} 
