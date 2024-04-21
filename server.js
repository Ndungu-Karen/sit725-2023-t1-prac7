// Require necessary modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);

// Attach Socket.io to the server
const io = socketIo(server);

// Define a port number
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Set up event listeners for Socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send a random number to the client every second
    const interval = setInterval(() => {
        socket.emit('number', Math.floor(Math.random() * 10));
    }, 1000);

    // Listen for disconnection event
    socket.on('disconnect', () => {
        console.log('User disconnected');
        clearInterval(interval); // Clear the interval when a user disconnects
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
