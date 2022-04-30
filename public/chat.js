// Make connection
var socket = io();

// Query DOM
var message = document.getElementById("message"),
  username = document.getElementById("username"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

btn.addEventListener("click", () => {
  // Emit events
  socket.emit("chat", {
    message: message.value,
    username: username.value,
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  btn.disabled = false;
  socket.emit("typing", username.value);
});

// Listen for events
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  btn.disabled = true;
  output.innerHTML +=
    "<p><strong>" + data.username + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p>" + data + " is typing a message...</p>";
});
