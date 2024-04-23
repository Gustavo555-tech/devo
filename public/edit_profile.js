document.addEventListener("DOMContentLoaded", function () {
    var editProfileBtn = document.getElementById("edit-profile-btn");
    var profileForm = document.getElementById("edit-profile-form");
    var closeEditProfileBtn = document.getElementById("close-edit-profile-btn");
    var globalUserId; // Global variable to store the user ID
  
    // Edit Profile button click event
    editProfileBtn.addEventListener("click", function () {
      // Show the profile form
      profileForm.style.display = "block";
    });
  
    // Close Profile form button click event
    closeEditProfileBtn.addEventListener("click", function () {
      // Hide the profile form
      profileForm.style.display = "none";
    });
  
    // Fetch user information when the page loads
    fetch("/api/get-user-info")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Set the globalUserId
          globalUserId = data.userId;
  
          // Populate form fields with user data (you need to implement this)
  
          // Add submit event listener to the profile form
          profileForm.addEventListener("submit", function (event) {
            event.preventDefault();
            updateProfile();
          });
        } else {
          console.error("Error fetching user info:", data.message);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  
    // Function to handle updating profile
    function updateProfile() {
      // Get form data
      var formData = new FormData(profileForm);
  
      // Make a PUT request to update the profile on the server
      fetch(`/api/profile/${globalUserId}`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          alert(data.message);
          // Optionally, redirect the user to the profile page
          window.location.href = "/profile.html";
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("Failed to update profile. Please try again later.");
        });
    }
  });
  