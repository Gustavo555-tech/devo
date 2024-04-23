const PORT = process.env.PORT || 5500;
server.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});

// Function to redirect to chat.html page
function redirectToChatPage() {
    // Redirect to createPost.html
    window.location.href = "chat.html";
}

// Event listener for the button click
document.addEventListener("DOMContentLoaded", function() {
    // Get the button element
    var StartConversationButton = document.querySelector("button[Start Conversation]");

    // Add event listener for button click
    StartConversationButton.addEventListener("click", redirectToChatPage);
});

document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
  
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
  
    // Send message to server when send button is clicked
    sendButton.addEventListener('click', function () {
        const message = messageInput.value.trim();
        if (message !== '') {
            socket.emit('chatMessage', message);
            messageInput.value = '';
        }
    });
  
    // Append received messages to chat window
    socket.on('message', function (message) {
        const li = document.createElement('li');
        li.textContent = message;
        chatMessages.appendChild(li);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  });