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

// Close modal when clicking outside the content
window.onclick = function (event) {
    let modal = document.getElementById("info-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
