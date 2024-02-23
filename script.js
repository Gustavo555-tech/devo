document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            // Perform login logic (send data to server for validation)
            fetch('http://localhost:5500/api/index', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Invalid credentials');
                    }
                    return response.json();
                })
                .then(data => {
                    // If login is successful, redirect to the main content page
                    window.location.href = `/main.html?userId=${data.userId}`; // Update the redirection logic
                })
                .catch(error => {
                    console.error('Login Error:', error);
                    // Handle login failure, show an error message, etc.
                });
        });
    }

    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;
            const email = document.getElementById("login-email").value;

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Invalid email format');
                return;
            }

            // Perform registration logic (send data to server to create a new user)
            fetch('http://localhost:5500/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Registration failed');
                    }
                    // Registration successful, redirect back to the login page
                    window.location.href = "index.html";
                })
                .catch(error => {
                    console.error('Registration Error:', error);
                    // Handle registration failure, show an error message, etc.
                });
        });
    }
});
