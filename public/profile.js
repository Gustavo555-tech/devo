document.addEventListener("DOMContentLoaded", function() {
    // Fetch user information from the server
    fetchUserInfo();
  });
  
  function fetchUserInfo() {
    // Fetch user information from the server
    fetch('/api/get-user-info')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Call function to display user information
          displayUserInfo(data);
        } else {
          console.error('Error fetching user info:', data.message);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }
  
  function displayUserInfo(userInfo) {
    // Get the container element
    const userInfoContainer = document.getElementById('user-info-container');
  
    // Create HTML elements to display user information
    const usernameElement = document.createElement('h2');
    usernameElement.textContent = `Username: ${userInfo.username}`;
  
    const emailElement = document.createElement('p');
    emailElement.textContent = `Email: ${userInfo.email}`;
  
    // Append user information to the container
    userInfoContainer.appendChild(usernameElement);
    userInfoContainer.appendChild(emailElement);
  }
  