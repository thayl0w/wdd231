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
