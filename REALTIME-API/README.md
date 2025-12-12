
#  Real-time & Advanced APIs — Complete Guide

## 📌 Overview
This module covers building **real-time applications** and **advanced APIs** using Node.js. Topics include:

- WebSockets (Socket.io)  
- Server-Sent Events (SSE)  
- GraphQL (Apollo Server)  
- GraphQL Schemas & Resolvers  
- DataLoader for batching  
- GraphQL Subscriptions  

---

# ⚡ 1. WebSockets with Socket.io

## 1.1 What are WebSockets?
WebSockets provide **full-duplex communication** between client and server over a single TCP connection.

### Use Cases:
- Chat applications  
- Real-time notifications  
- Multiplayer games  

### Example:
**Server:**
```js
import { Server } from "socket.io";

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});
````

**Client:**

```js
const socket = io("http://localhost:3000");
socket.emit("message", "Hello!");
socket.on("message", console.log);
```

---

# 🌊 2. Server-Sent Events (SSE)

SSE allows the server to **push updates** to the client over HTTP. Unlike WebSockets, SSE is **unidirectional** (server → client).

### Example:

**Server:**

```js
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);
  }, 1000);
});
```

**Client:**

```js
const es = new EventSource("/events");
es.onmessage = (event) => console.log(event.data);
```

### Use Cases:

* Live feeds
* Stock ticker updates
* Notifications

---

# 🧩 3. GraphQL with Apollo Server

GraphQL is a query language for APIs that allows clients to **request only the data they need**.

### Benefits:

* Single endpoint
* Flexible queries
* Strongly typed schemas

### Setup Example:

```js
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User { id: ID!, name: String! }
  type Query { users: [User] }
`;

const resolvers = {
  Query: {
    users: () => [{ id: 1, name: "John" }],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000);
```

---

# ⚡ 4. GraphQL Schemas & Resolvers

* **Schema** defines the types and queries/mutations/subscriptions.
* **Resolvers** are functions that return data for each field in the schema.

Example:

```js
const typeDefs = gql`
  type Course { id: ID!, title: String! }
  type Query { course(id: ID!): Course }
`;

const resolvers = {
  Query: {
    course: (_, { id }) => db.findCourseById(id),
  },
};
```

---

# 🔄 5. DataLoader for Batching

DataLoader batches and caches requests to avoid **N+1 query problems** in GraphQL.

Example:

```js
import DataLoader from "dataloader";

const userLoader = new DataLoader(async (ids) => {
  const users = await User.find({ _id: { $in: ids } });
  return ids.map(id => users.find(u => u.id === id));
});
```

### Benefits:

* Reduces DB calls
* Improves performance in nested queries

---

# 🔔 6. Subscriptions

GraphQL Subscriptions allow clients to **receive real-time updates** over WebSockets.

### Example:

```js
const typeDefs = gql`
  type Message { content: String! }
  type Subscription { messageAdded: Message }
`;

const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("MESSAGE_ADDED")
    }
  }
};
```

### Use Cases:

* Chat applications
* Real-time dashboards
* Live notifications

---


| Concept       | Purpose                                     |
| ------------- | ------------------------------------------- |
| WebSockets    | Full-duplex real-time communication         |
| SSE           | Server → client streaming over HTTP         |
| GraphQL       | Flexible API queries                        |
| Schemas       | Define types and queries                    |
| Resolvers     | Provide data for each field                 |
| DataLoader    | Batch & cache requests, prevent N+1 queries |
| Subscriptions | Real-time updates in GraphQL                |

