// contact.js
import { saveFormData, loadFormData, clearFormData } from "./storage.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("form-message");

    loadFormData();

    // Save data as user types
    document.getElementById("name").addEventListener("input", saveFormData);
    document.getElementById("email").addEventListener("input", saveFormData);
    document.getElementById("message").addEventListener("input", saveFormData);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Reset previous messages
        formMessage.style.display = "block";
        formMessage.style.opacity = "1";
        formMessage.innerHTML = "";
        formMessage.style.transition = "opacity 0.5s ease";

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
            formMessage.innerHTML = "✅ Message sent successfully!";
            formMessage.style.color = "green";
            formMessage.style.fontWeight = "bold";

            form.reset();
            clearFormData();

            setTimeout(() => {
                formMessage.style.opacity = "0";
                setTimeout(() => {
                    formMessage.style.display = "none";
                    formMessage.style.opacity = "1";
                }, 500);
            }, 3000);
        }
    });
});
