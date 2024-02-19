// Change Password button click event
document.getElementById("change-password-btn").addEventListener("click", function () {
    // Show the password modal
    var passwordModal = document.getElementById("password-modal");
    passwordModal.style.display = "block";
    centerModal(passwordModal);
});

// Add click event listener to the "Close" button in the password modal
document.getElementById("close-password-btn-modal").addEventListener("click", function () {
    closePasswordModal();
});

// Add click event listener to the "Change Password" button in the modal
document.getElementById("change-password-btn-modal").addEventListener("click", function () {
    // Retrieve the globalUserId from the server before changing the password
    fetch("http://localhost:5500/api/get-user-info")
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Set the globalUserId
                var globalUserId = data.userId;
                // Call the changePassword function with the retrieved globalUserId
                changePassword(globalUserId);
            } else {
                console.error("Error fetching user info:", data.message);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
});

// Function to handle changing password
function changePassword(userId) {
    var newPasswordInput = document.getElementById("new-password");
    var confirmPasswordInput = document.getElementById("confirm-password");

    var newPassword = newPasswordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Make an AJAX request to update the password on the server
    fetch(`http://localhost:5500/api/change-password/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }), // Send newPassword in the request body
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            alert(data.message);

            // Close the modal after changing password
            closePasswordModal();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Function to close the password modal
function closePasswordModal() {
    var passwordModal = document.getElementById("password-modal");
    passwordModal.style.display = "none";
}
