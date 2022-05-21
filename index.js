var express = require("express");
var socket = require("socket.io");

// App setup
var app = express();
var server = app.listen(4000, function () {
  console.log("Listening for requests on port 4000😊");
});

// Static files
app.use(express.static("public"));

// Socket setup & pass server
var io = socket(server);

io.on("connection", (socket) => {
  console.log("Made socket connection with id - 😀 - ", socket.id);

  // User chat event
  socket.on("chat", function (data) {
    // console.log(data);
    io.sockets.emit("chat", data);
  });

  // User typing event
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
