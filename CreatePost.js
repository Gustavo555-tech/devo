// Function to redirect to createPost.html page
function redirectToCreatePostPage() {
    // Redirect to createPost.html
    window.location.href = "createPost.html";
}

// Event listener for the button click
document.addEventListener("DOMContentLoaded", function() {
    // Get the button element
    var createPostButton = document.querySelector("button[CreatePost]");

    // Add event listener for button click
    createPostButton.addEventListener("click", redirectToCreatePostPage);
});


// Event listener for the post form submission
document.getElementById("post-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const message = document.getElementById("post-input").value;

    // Send the new post to the server
    fetch('http://localhost:5500/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // After posting a new message, fetch all posts and update the display
            getPosts();
        })
        .catch(error => console.error('Error:', error));

    document.getElementById("post-input").value = "";
});

// Function to get a formatted date and time
function getFormattedDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedMonth}/${formattedDay}/${year}, ${formattedHours}:${formattedMinutes}`;
}

// Function to fetch and display posts
function getPosts() {
    // Fetch all posts from the server
    fetch('http://localhost:5500/api/posts')
        .then(response => response.json())
        .then(posts => {
            console.log('Received posts:', posts); // Log received posts for debugging

            const postsContainer = document.getElementById("posts-container");
            postsContainer.innerHTML = "";

            // Loop through each post and create a post element
            posts.forEach(post => {
                console.log('Post timestamp:', post.timestamp); // Log each post's timestamp

                const postElement = document.createElement("div");
                postElement.classList.add("post");

                // Create a paragraph for the post text
                postElement.innerHTML = `<div class="post-text">${post.message.replace(/\n/g, '<br>')}</div>`;

                // Create a paragraph for the post metadata (date and time)
                const postMetadata = document.createElement("p");
                postMetadata.classList.add("post-metadata");
                
                // Ensure that post.timestamp is a valid timestamp
                const formattedDateTime = getFormattedDateTime(new Date(post.timestamp).getTime());
                
                postMetadata.textContent = `Posted on: ${formattedDateTime}`;

                // Append post text and metadata to the post element
                postElement.appendChild(postMetadata);

                // Append the post element to the posts container
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load posts on page load and set an interval to refresh periodically
window.onload = function () {
    getPosts();
    setInterval(getPosts, 5000); // Refresh every 5 seconds
};