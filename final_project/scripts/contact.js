// contact.js
import { saveFormData, loadFormData, clearFormData } from "./storage.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("form-message");

    loadFormData();

    document.getElementById("name").addEventListener("input", saveFormData);
    document.getElementById("email").addEventListener("input", saveFormData);
    document.getElementById("message").addEventListener("input", saveFormData);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        formMessage.style.display = "block";
        formMessage.style.opacity = "1";
        formMessage.innerHTML = "";
        formMessage.style.transition = "opacity 0.5s ease";

        if (!name && !email && !message) {
            formMessage.innerHTML = "⚠️ All fields are required!";
            formMessage.style.color = "red";
            return;
        } else if (!name) {
            formMessage.innerHTML = "⚠️ Please enter your name.";
            formMessage.style.color = "red";
            return;
        } else if (!email.includes("@") || !email.includes(".")) {
            formMessage.innerHTML = "⚠️ Please enter a valid email address.";
            formMessage.style.color = "red";
            return;
        } else if (message.length < 10) {
            formMessage.innerHTML = "⚠️ Your message must be at least 10 characters.";
            formMessage.style.color = "red";
            return;
        }

        // ✅ Asynchronous Function with try-catch
        try {
            formMessage.innerHTML = "⏳ Sending message...";
            formMessage.style.color = "blue";

            await fakeServerRequest(); // Simulated delay

            formMessage.innerHTML = "✅ Message sent successfully!";
            formMessage.style.color = "green";
            formMessage.style.fontWeight = "bold";

            form.reset();
            clearFormData();
        } catch (error) {
            formMessage.innerHTML = "❌ Failed to send message. Please try again.";
            formMessage.style.color = "red";
        }

        setTimeout(() => {
            formMessage.style.opacity = "0";
            setTimeout(() => {
                formMessage.style.display = "none";
                formMessage.style.opacity = "1";
            }, 500);
        }, 3000);
    });
});

// Simulate a server request with async/await
async function fakeServerRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            success ? resolve() : reject(new Error("Server error"));
        }, 2000); // Simulated delay
    });
}
