const express = require("express");
const cors = require("cors");

// Initialize the Express app
const fs = require("fs");
const app = express();

const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

// Import the uuid library
const { v4: uuidv4 } = require("uuid");

// Use bodyParser to handle JSON data and cors to apply CORS policy
app.use(express.json());
app.use(cors());

app.use(express.static('./public'))

const users = [];
const posts = [];
const notifications = [];

// Initialize global variable for userId
let globalUserId;

// Set the port to 5500 and start the server
const port = 5500;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://192.168.1.15:${port}`);
});

// Endpoint for login
app.post("/api/index", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Assign userId to the global variable
    globalUserId = user.id;

    res.json({ success: true, username: user.username, userId: user.id });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }
});

// Endpoint for user registration
app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  const existingUser = users.find(
    (u) => u.username === username || u.email === email
  );

  if (existingUser) {
    res
      .status(409)
      .json({ success: false, message: "Username or email already exists" });
  } else {
    const userId = uuidv4(); // Generate a unique user ID
    const newUser = { username, password, email, id: userId };
    users.push(newUser);

    // Assign userId to the global variable
    globalUserId = userId;

    try {
      await fs.promises.writeFile(
        "users.json",
        JSON.stringify(users, null, 2),
        "utf-8"
      );
      res.json({ success: true, message: "Registration successful", userId });
    } catch (error) {
      console.error("Error writing to file:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

// Endpoint for getting user information
app.get("/api/get-user-info", (req, res) => {
  console.log("Handling /api/get-user-info request");

  const userId = globalUserId;

  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({
      success: true,
      userId: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Endpoint for changing email
app.post("/api/change-email/:userId", (req, res) => {
  try {
    const userId = globalUserId;
    const { newEmail } = req.body;

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Updating email for user:", user.username);
    console.log("Old Email:", user.email);

    user.email = newEmail;

    fs.promises
      .writeFile("users.json", JSON.stringify(users, null, 2), "utf-8")
      .then(() => {
        console.log("Email changed successfully");
        console.log("New Email:", newEmail);
        res.json({
          success: true,
          message: "Email changed successfully",
          user,
        });
      })
      .catch((error) => {
        console.error("Error writing to file:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Endpoint for changing password ****************
app.post("/api/change-password/:userId", (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve userId from request params
    const { newPassword } = req.body;

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Updating password for user:", user.password);
    console.log("Old password:", user.password);

    user.password = newPassword;

    fs.promises
      .writeFile("users.json", JSON.stringify(users, null, 2), "utf-8")
      .then(() => {
        console.log("Password changed successfully");
        console.log("New Password:", newPassword);
        res.json({
          success: true,
          message: "Password changed successfully",
          user,
        });
      })
      .catch((error) => {
        console.error("Error writing to file:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Define a POST endpoint '/api/posts' to add new messages to the 'posts' array
app.post("/api/posts", (req, res) => {
  // Retrieve the message from the request
  const message = req.body.message;

  // Add the message to the 'posts' array along with the current timestamp
  const timestamp = new Date().toISOString(); // Use toISOString for a standardized timestamp
  posts.push({ message, timestamp });

  // Send a JSON response to indicate success
  res.json({ success: true });
});

// Define a GET endpoint '/api/posts' to retrieve all messages and return them as JSON
app.get("/api/posts", (req, res) => {
  // Send back the 'posts' array as JSON
  res.json(posts);
});

// Define a GET endpoint '/api/notifications' to retrieve all notifications and return them as JSON
app.get("/api/notifications", (req, res) => {
  // Send back the 'notifications' array as JSON
  res.json(notifications);
});

// Endpoint for getting user profile information
app.get("/api/profile", (req, res) => {
  const userId = globalUserId;

  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({
      success: true,
      userId: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture, // Add profile picture field
    });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Endpoint for updating user profile information
app.put("/api/profile", (req, res) => {
  const userId = globalUserId;
  const { username, email, bio, profilePicture } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    // Update user profile
    users[userIndex].username = username;
    users[userIndex].email = email;
    users[userIndex].bio = bio;
    users[userIndex].profilePicture = profilePicture;

    // Update user profile in users.json file
    fs.promises
      .writeFile("users.json", JSON.stringify(users, null, 2), "utf-8")
      .then(() => {
        res.json({ success: true, message: "Profile updated successfully" });
      })
      .catch((error) => {
        console.error("Error writing to file:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Define a POST endpoint '/api/posts' to add new messages to the 'posts' array
app.post("/api/posts", (req, res) => {
  // Retrieve the message and visibility from the request
  const { message, visibility } = req.body;

  // Add the message to the 'posts' array of the user along with the visibility
  const userId = globalUserId; // Retrieve the userId of the current user
  const user = users.find((u) => u.id === userId);

  if (user) {
    const timestamp = new Date().toISOString();
    user.posts.push({ content: message, visibility, timestamp });
    // Write the updated user data to the JSON file
    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
      } else {
        res.json({ success: true, message: "Post added successfully" });
      }
    });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Define a GET endpoint '/api/posts' to retrieve messages based on visibility
app.get("/api/posts", (req, res) => {
  // Retrieve the userId of the current user
  const userId = globalUserId;
  const user = users.find((u) => u.id === userId);

  if (user) {
    // Filter the posts based on visibility
    const visiblePosts = user.posts.filter((post) => post.visibility === "public");
    res.json(visiblePosts);
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});
