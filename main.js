const socket = io();

const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("sendBtn");

// Render message
const renderMessage = (msg) => {
  const div = document.createElement("div");
  div.textContent = `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.username}: ${msg.message}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
};

// Receive chat history
socket.on("chat_history", (messages) => {
  messages.forEach(renderMessage);
});

// Receive new messages
socket.on("receive_message", renderMessage);

// Send message
sendBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  const username = usernameInput.value.trim() || "Anonymous";
  if (!message) return;
  socket.emit("send_message", { username, message });
  messageInput.value = "";
});
