function showDetails(title, imageSrc, description) {
    let modal = document.getElementById("info-modal");
    let modalTitle = document.getElementById("modal-title");
    let modalImage = document.getElementById("modal-image");
    let modalDescription = document.getElementById("modal-description");

    modalTitle.textContent = title;
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalDescription.textContent = description;

    modal.style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

document.addEventListener("click", function (event) {
    let modal = document.getElementById("info-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Close buttons for both forms
document.querySelectorAll(".close-btn").forEach(button => {
    button.addEventListener("click", function() {
        this.closest(".form-container").style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Open Modals
    document.querySelector(".login").addEventListener("click", function () {
        openModal("loginModal");
    });

    document.querySelector(".signup").addEventListener("click", function () {
        openModal("signupModal");
    });

    // Function to Open Modal
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "flex";
    }

    // Function to Close Modal
    window.closeModal = function (modalId) {
        document.getElementById(modalId).style.display = "none";
    };

    // Close modal when clicking outside content
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });
});

// Add this part at the end of your existing script
document.querySelectorAll('.login').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        openModal('loginModal');
    });
});

document.querySelectorAll('.signup').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        openModal('signupModal');
    });
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('modal-center');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('modal-center');
    }
}

document.querySelectorAll('.login').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        openModal('loginModal');
    });
});

document.querySelectorAll('.signup').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        openModal('signupModal');
    });
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('modal-center');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('modal-center');
    }
}
function toggleInfoBox(event) {
    event.preventDefault(); // Prevent the default link behavior
    const infoBox = document.getElementById("info-box");
    if (infoBox.classList.contains("active")) {
        infoBox.classList.remove("active");
    } else {
        infoBox.classList.add("active");
    }
    // Position the box beside the button
    const button = event.target;
    const rect = button.getBoundingClientRect();
    box.style.top = `${rect.top + window.scrollY + button.offsetHeight}px`;
    box.style.left = `${rect.left + window.scrollX}px`;
}

// Sign Up Form Submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const user = { name, email, password };
    
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    closeModal('signupModal');
    alert('Sign Up Successful! You are now signed up and logged in.');
});

// Log In Form Submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    // Check if user exists and password matches
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        closeModal('loginModal');
        alert(`Welcome back, ${storedUser.name}! You are now logged in.`);
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("form-message");

    // Load stored data when the page loads
    document.getElementById("name").value = localStorage.getItem("contactName") || "";
    document.getElementById("email").value = localStorage.getItem("contactEmail") || "";
    document.getElementById("message").value = localStorage.getItem("contactMessage") || "";

    // Save form data in localStorage as user types
    document.getElementById("name").addEventListener("input", function () {
        localStorage.setItem("contactName", this.value);
    });

    document.getElementById("email").addEventListener("input", function () {
        localStorage.setItem("contactEmail", this.value);
    });

    document.getElementById("message").addEventListener("input", function () {
        localStorage.setItem("contactMessage", this.value);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Clear previous messages
        formMessage.style.display = "block";
        formMessage.style.opacity = "1";
        formMessage.innerHTML = "";
        formMessage.style.transition = "opacity 0.5s ease";

        // Conditional branching for validation
        if (!name && !email && !message) {
            formMessage.innerHTML = "⚠️ All fields are required!";
            formMessage.style.color = "red";
        } else if (!name) {
            formMessage.innerHTML = "⚠️ Please enter your name.";
            formMessage.style.color = "red";
        } else if (!email.includes("@") || !email.includes(".")) {
            formMessage.innerHTML = "⚠️ Please enter a valid email address.";
            formMessage.style.color = "red";
        } else if (message.length < 10) {
            formMessage.innerHTML = "⚠️ Your message must be at least 10 characters.";
            formMessage.style.color = "red";
        } else {
            // Success message
            formMessage.innerHTML = "✅ Message sent successfully!";
            formMessage.style.color = "green";
            formMessage.style.fontWeight = "bold";

            // Clear form fields and remove local storage
            form.reset();
            localStorage.removeItem("contactName");
            localStorage.removeItem("contactEmail");
            localStorage.removeItem("contactMessage");

            // Hide the message after 3 seconds with fade-out effect
            setTimeout(() => {
                formMessage.style.opacity = "0";
                setTimeout(() => {
                    formMessage.style.display = "none";
                    formMessage.style.opacity = "1"; // Reset opacity for next message
                }, 500);
            }, 3000);
        }
        
    });
});
