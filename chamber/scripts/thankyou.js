document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const detailsContainer = document.getElementById("submission-details");

    // Function to format timestamp
    function formatTimestamp(timestamp) {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    const details = `
        <p><strong>First Name:</strong> ${params.get("first-name") || "N/A"}</p>
        <p><strong>Last Name:</strong> ${params.get("last-name") || "N/A"}</p>
        <p><strong>Email:</strong> <a href="mailto:${params.get("email")}" aria-label="Email ${params.get("email")}">${params.get("email") || "N/A"}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${params.get("phone")}" aria-label="Call ${params.get("phone")}">${params.get("phone") || "N/A"}</a></p>
        <p><strong>Organization:</strong> ${params.get("organization") || "N/A"}</p>
        <p><strong>Submitted on:</strong> ${formatTimestamp(params.get("timestamp"))}</p>
    `;

    detailsContainer.innerHTML = details;
});
