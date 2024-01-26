document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    // Your account button and submenu
    var accountBtn = document.getElementById('account-btn');
    var accountMenu = document.getElementById('account-menu');

    // Your activity button and submenu
    var activityBtn = document.getElementById('activity-btn');
    var activityMenu = document.getElementById('activity-menu');

    // Notifications button and submenu
    var notificationsBtn = document.getElementById('notifications-btn');
    var notificationsMenu = document.getElementById('notifications-menu');

    var globalUserId;

    // Change Email button click event
    document.getElementById('change-email-btn').addEventListener('click', function () {
        // Show the email modal
        var emailModal = document.getElementById('email-modal');
        emailModal.style.display = 'block';
        centerModal(emailModal);
    });

    // Add click event listener to the "Close" button in the modal
    document.getElementById('close-email-btn-modal').addEventListener('click', function () {
        closeEmailModal();
    });

    // Fetch user information when the page loads
    fetch('http://localhost:5500/api/get-user-info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Set the globalUserId
                globalUserId = data.userId;
                // Other code related to user info can go here

                // Add click event listener to the "Change Email" button in the modal
                document.getElementById('change-email-btn-modal').addEventListener('click', function () {
                    changeEmail();  // Call the changeEmail function
                });
            } else {
                console.error('Error fetching user info:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    // Function to handle changing email
    function changeEmail() {
        var newEmailInput = document.getElementById('new-email');
        var newEmail = newEmailInput.value;

        if (newEmail && isValidEmail(newEmail)) {
            // Make an AJAX request to update the email on the server
            fetch(`http://localhost:5500/api/change-email/${globalUserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newEmail }),  // Send newEmail in the request body
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    alert(data.message);

                    // Close the modal after changing email
                    closeEmailModal();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            // Handle invalid email
            alert('Invalid email format');
        }
    }

    // Function to validate email format
    function isValidEmail(email) {
        // Basic email validation (you may want to improve this)
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to center the modal on the screen
    function centerModal(emailModal) {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var modalWidth = modal.offsetWidth;
        var modalHeight = modal.offsetHeight;

        var leftPosition = (windowWidth - modalWidth) / 2;
        var topPosition = (windowHeight - modalHeight) / 2;

        modal.style.left = leftPosition + 'px';
        modal.style.top = topPosition + 'px';
    }

    // Function to close the email modal
    function closeEmailModal() {
        var emailModal = document.getElementById('email-modal');
        emailModal.style.display = 'none';
    }

     // Change Password button click event ******
     document.getElementById('change-password-btn').addEventListener('click', function () {
        // Show the password modal
        var passwordModal = document.getElementById('password-modal');
        passwordModal.style.display = 'block';
        centerModal(passwordModal);
    });

    // Add click event listener to the "Close" button in the modal
    document.getElementById('close-password-btn-modal').addEventListener('click', function () {
        closePasswordModal();
    });

    // Fetch user information when the page loads
    fetch('http://localhost:5500/api/get-user-info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Set the globalUserId
                globalUserId = data.userId;
                // Other code related to user info can go here

                // Add click event listener to the "Change Password" button in the modal
                document.getElementById('change-password-btn-modal').addEventListener('click', function () {
                    changePassword();  // Call the changePassword function
                });
            } else {
                console.error('Error fetching user info:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    // Function to handle changing password
    function changePassword() {
        var newPasswordInput = document.getElementById('new-password');
        var newPassword = newPasswordInput.value;

        if (newPassword && isValidPassword(newPassword)) {
            // Make an AJAX request to update the password on the server
            fetch(`http://localhost:5500/api/change-password/${globalUserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),  // Send newPassword in the request body
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    alert(data.message);

                    // Close the modal after changing password
                    closePasswordModal();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            // Handle invalid password
            alert('Invalid password format');
        }
    }

    // Function to center the modal on the screen
    function centerModal(passwordModal) {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var modalWidth = modal.offsetWidth;
        var modalHeight = modal.offsetHeight;

        var leftPosition = (windowWidth - modalWidth) / 2;
        var topPosition = (windowHeight - modalHeight) / 2;

        modal.style.left = leftPosition + 'px';
        modal.style.top = topPosition + 'px';
    }

    // Function to close the password modal *****
    function closePasswordModal() {
        var passwordModal = document.getElementById('password-modal');
        passwordModal.style.display = 'none';
    }

    // Voeg een click event listener toe aan de profielfoto
    profilePicture.addEventListener('click', function () {
        // Toggle de 'hidden' klasse van het menu-container om het te tonen/verbergen
        menuContainer.classList.toggle('hidden');

        if (!menuContainer.classList.contains('hidden')) {
            adjustMenuPosition(menuContainer);
        }
    });

    // Your account button click event
    accountBtn.addEventListener('click', function () {
        // Toggle the 'hidden' class of the account submenu
        accountMenu.classList.toggle('hidden');

        if (!accountMenu.classList.contains('hidden')) {
            adjustMenuPosition(accountMenu);
        }
    });

    // Notifications button click event
    notificationsBtn.addEventListener('click', function () {
        // Toggle the 'hidden' class of the notifications submenu
        notificationsMenu.classList.toggle('hidden');

        if (!notificationsMenu.classList.contains('hidden')) {
            adjustMenuPosition(notificationsMenu);
        }
    });

    // Function to adjust menu position
    function adjustMenuPosition(menu) {
        var rect = menu.getBoundingClientRect();
        var windowWidth = window.innerWidth;
        var menuWidth = menu.offsetWidth;
        var offset = 50; // Adjust this value based on your preference

        // Calculate the new position
        var newPosition = windowWidth - rect.right - menuWidth - offset;

        // Set the new left position
        menu.style.left = newPosition + 'px';
    }
});
