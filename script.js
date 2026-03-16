document.addEventListener("DOMContentLoaded", function () {
    highlightActionNav();  // Highlights the active navbar link
    setupSearchFilters();  // Enables search filtering on list pages
    setupSmoothScrolling();  // Adds smooth scrolling for anchor links
    setupLoginModal();    // Handles the login modal display logic
    setupMobileMenu();    // Enables the mobile menu toggling 
    setupSignupFormValidation(); // Adds validation for the signup form
});

/* ========================== */
/* 1. Highlight Active Navbar */
/* ========================== */
function highlightActionNav() {
    const currentPage = window.location.pathname;
    document.querySelectorAll("nav ul li a").forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add("active");   // Adds 'active' class to highlight the current page link 
        }
    });
}

/* ========================== */
/* 2. Search Filtering on List Pages */
/* ========================== */
function setupSearchFilters() {
    const searchInputs = document.querySelectorAll(".search-box input");

    if (searchInputs.length === 0) return; // Ensure there are search inputs before adding event listeners

    searchInputs.forEach(input => {
        input.addEventListener("keyup", function () {
            const searchTerm = this.value.toLowerCase();
            const pageType = document.body.dataset.page;
            let items;

            if (pageType === "publishers") {
                items = document.querySelectorAll(".publisher-list li");
            } else if (pageType === "subjects") {
                items = document.querySelectorAll(".subject-list li");
            } else if (pageType === "journals") {
                items = document.querySelectorAll(".journal-list li");
            }

            if (items) {
                items.forEach(item => {
                    item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? "block" : "none";
                });
            }
        });
    });
}

/* ========================== */
/* 3. Smooth Scrolling */
/* ========================== */
function setupSmoothScrolling() {
    document.querySelectorAll(".alphabet-nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default jump behavior
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });  // Scrolls smoothly to the target 
            }
        });
    });
}

/* ========================== */
/* 4. Login Modal Handling */
/* ========================== */
function setupLoginModal() {
    const loginModal = document.querySelector(".loginModal");
    const loginBtn = document.querySelector(".login-btn");
    const closeModal = document.querySelector(".close-modal");

    // Ensure modal elements exist before adding event listeners
    if (!loginModal || !loginBtn || !closeModal) {
        console.error("Login modal elements missing!");
        return;
    }

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
}

/* ========================== */
/* 5. Mobile Navbar Toggle */
/* ========================== */
function setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Ensure menu elements exist before adding event listeners
    if (!hamburger || !navLinks) {
        console.error("Mobile menu elements missing!");
        return;
    }

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active"); // Toggle the menu visibility
    });

    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
            navLinks.classList.remove("active"); // Hide menu when clicking outside
        }
    });
}

/* ========================== */
/* 6. Client Side Validation  */
/* ========================== */
function setupSignupFormValidation() {
    const signupButton = document.querySelector(".signup-btn");
    
    // Ensure signup button exists before adding event listener
    if (!signupButton) {
        console.error("Signup button not found!");
        return;
    }

    signupButton.addEventListener("click", function (event) {
        const emailInput = document.querySelector('input[type="email"]');
        const passwordInput = document.querySelector('input[type="password"]');

        // Ensure email and password fields exist before validation
        if (!emailInput || !passwordInput) {
            console.error("Signup form inputs are missing!");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic email and password validation
        if (!email.includes("@") || password.length < 6) {
            event.preventDefault();
            alert("Please enter a valid email and password (min 6 characters)");
        }
    });
}
