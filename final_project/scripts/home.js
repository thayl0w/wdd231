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

function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

document.addEventListener("click", function (event) {
    let modal = document.getElementById("info-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

function closeModal() {
    document.getElementById("info-modal").style.display = "none";
}

document.querySelector(".login-btn").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".login-form").style.display = "block";
});

document.querySelector(".signup-btn").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".signup-form").style.display = "block";
});

// Close buttons for both forms
document.querySelectorAll(".close-btn").forEach(button => {
    button.addEventListener("click", function() {
        this.closest(".form-container").style.display = "none";
    });
});

