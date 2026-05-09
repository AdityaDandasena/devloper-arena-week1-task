// =========================
// Reusable Functions
// =========================

// Show error message
function showError(input, message) {
    let error = input.nextElementSibling;
    
    if (!error || !error.classList.contains("error-message")) {
        error = document.createElement("small");
        error.classList.add("error-message");
        input.parentNode.appendChild(error);
    }

    error.innerText = message;
    input.style.borderColor = "red";
}

// Clear error message
function clearError(input) {
    const error = input.parentNode.querySelector(".error-message");
    if (error) error.remove();
    input.style.borderColor = "green";
}

// Validate email format
function isValidEmail(email) {
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return regex.test(email);
}

// =========================
// DOM Elements
// =========================

const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// =========================
// Form Validation
// =========================

form.addEventListener("submit", function (e) {
    let isValid = true;

    // Name validation
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Email validation
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required");
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Enter a valid email");
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Message validation
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, "Message must be at least 10 characters");
        isValid = false;
    } else {
        clearError(messageInput);
    }

    if (!isValid) {
        e.preventDefault(); // stop form submission
    }
});

// =========================
// Interactive Feature 1: Live Character Counter
// =========================

const counter = document.createElement("small");
messageInput.parentNode.appendChild(counter);

messageInput.addEventListener("input", function () {
    const length = messageInput.value.length;
    counter.innerText = `${length} characters`;
});

// =========================
// Interactive Feature 2: Smooth Scroll Navigation
// =========================

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});

// =========================
// Interactive Feature 3: Highlight Active Section
// =========================

window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// =========================
// Interactive Feature 4: Image Click Toggle Effect
// =========================

const image = document.querySelector("#about img");

image.addEventListener("click", function () {
    image.classList.toggle("zoom");
});