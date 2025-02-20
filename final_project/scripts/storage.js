// storage.js

export function saveFormData() {
    localStorage.setItem("contactName", document.getElementById("name").value);
    localStorage.setItem("contactEmail", document.getElementById("email").value);
    localStorage.setItem("contactMessage", document.getElementById("message").value);
}

export function loadFormData() {
    document.getElementById("name").value = localStorage.getItem("contactName") || "";
    document.getElementById("email").value = localStorage.getItem("contactEmail") || "";
    document.getElementById("message").value = localStorage.getItem("contactMessage") || "";
}

export function clearFormData() {
    localStorage.removeItem("contactName");
    localStorage.removeItem("contactEmail");
    localStorage.removeItem("contactMessage");
}
