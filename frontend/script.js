// ========================================
// AI Personalized Learning System
// Frontend JavaScript
// ========================================


// ========================================
// REGISTER FORM
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        // Prevent page refresh
        event.preventDefault();


        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const course = document.getElementById("course").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;


        // Check password
        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // Registration successful
        alert(
            "Registration Successful! 🎉\n\n" +
            "Welcome " + name + "!"
        );


        // Clear form
        registerForm.reset();

    });

}


// ========================================
// LOGIN FORM
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        // Prevent page refresh
        event.preventDefault();


        // Get login values
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;


        // Check login fields
        if (email === "" || password === "") {

            alert("Please enter email and password.");

            return;
        }


        // Login successful
        alert("Login Successful! 🎉");


        // Dashboard page will be connected later
        // window.location.href = "dashboard.html";

    });

}