import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { saveMessage, getAllMessages } from "./src/utils/messageService.js";
import { sessionMiddleware } from "./src/sessions/sessionStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(sessionMiddleware);

// Helper to share session with Socket.io
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// Socket.io connection
io.on("connection", async (socket) => {
  const username = socket.handshake.query.username || "Anonymous";
  console.log(`${username} connected: ${socket.id}`);

  // Join room if provided
  socket.on("join_room", async (room) => {
    socket.join(room);
    const messages = await getAllMessages(room);
    socket.emit("chat_history", messages);
    io.to(room).emit("system_message", `${username} joined the room`);
  });

  // Listen for messages
  socket.on("send_message", async ({ room, message }) => {
    const msgData = {
      username,
      message,
      timestamp: new Date().toISOString(),
      room
    };
    await saveMessage(msgData, room);
    io.to(room).emit("receive_message", msgData);
  });

  // Typing indicator
  socket.on("typing", (room) => {
    socket.to(room).emit("typing", username);
  });

  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
