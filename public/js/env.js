// Connect to the Socket.io server
let socket = io();

// Listen for 'number' event from the server
socket.on('number', (data) => {
    // Display the received data in the console
    console.log('Random number: ' + data);
});
