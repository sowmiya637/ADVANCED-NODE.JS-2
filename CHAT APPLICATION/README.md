
# 💬 Real-time Chat Application — Practice Project

## 📌 Overview
This project demonstrates building a **real-time chat application** using **Node.js**, **Express**, **Socket.io**, and optionally **MongoDB** for message persistence.  

Features include:
- Real-time messaging between users  
- User authentication  
- Multiple chat rooms  
- Online/offline status  
- Message persistence  
- Event notifications  

---

# 🧩 Technologies Used
- **Node.js / Express** — Server and API handling  
- **Socket.io** — Real-time WebSocket communication  
- **MongoDB / Mongoose** — Optional storage for chat messages and users  
- **JWT** — Authentication  
- **HTML / CSS / JS** — Frontend interface  
- **Redis** (optional) — Session management or scaling Socket.io across multiple servers  

---

# ⚡ Key Concepts

## 1. WebSockets with Socket.io
- Provides **full-duplex communication** between client and server  
- Enables **instant message delivery** without polling  

### Example:
**Server:**
```js
import { Server } from "socket.io";

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg); // broadcast to all users
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});
````

**Client:**

```js
const socket = io("http://localhost:3000");

socket.emit("sendMessage", { user: "Alice", text: "Hello!" });

socket.on("receiveMessage", (msg) => {
  console.log(msg.user, ":", msg.text);
});
```

---

## 2. Authentication

* **JWT or session-based authentication** to identify users
* Only logged-in users can join chat rooms

Example JWT middleware:

```js
const token = req.headers.authorization?.split(" ")[1];
if (!token) return res.status(401).send("Unauthorized");

const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
```

---

## 3. Chat Rooms

* Users can join multiple rooms
* Messages are broadcasted only to room participants

### Example:

```js
socket.join("room1"); // join a room
io.to("room1").emit("receiveMessage", msg); // broadcast to room
```

---

## 4. Message Persistence (Optional)

* Store messages in MongoDB for chat history
* Schema example:

```js
const messageSchema = new mongoose.Schema({
  user: String,
  room: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
```

* Fetch last N messages on room join:

```js
const messages = await Message.find({ room: "room1" }).sort({ createdAt: 1 });
```

---

## 5. Online / Offline Status

* Track connected users with Socket.io `connection` and `disconnect` events
* Optional Redis store for scaling across multiple instances

---

## 6. Event Notifications

* Notify all users of:

  * New messages
  * User join/leave events
* Real-time updates using Socket.io events

---

## 7. Frontend Interaction

* HTML + CSS + JS frontend
* Form input for sending messages
* Scrollable chat window
* Online users list

### Example Client Code:

```js
const sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", () => {
  const msg = input.value;
  socket.emit("sendMessage", { user: username, text: msg });
});
```

---

# 🧩 Architecture Diagram

```
[Client Browser]  <-->  [Socket.io Server]  <-->  [MongoDB]
        |                       |
        |------- REST APIs ------|
```

* Clients communicate via **WebSockets** for messages
* Optional REST APIs for user authentication and message history
* MongoDB stores persistent data

---

# 🔄 Scaling Considerations

* Use **Redis adapter for Socket.io** to share events across multiple Node.js instances
* Use **PM2 clustering** to use multiple CPU cores
* Optimize for **high number of concurrent connections**



Do you want me to do that?
```
