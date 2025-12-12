import express from "express";
import path from "path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

import typeDefs from "./src/graphql/schema.js";
import resolvers from "./src/graphql/resolvers.js";

const app = express();

// Serve HTML
const __dirname = process.cwd();
app.use(express.static(path.join(__dirname, "public")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

// GraphQL API
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server)
);

app.listen(3000, () => {
  console.log(" Server running at http://localhost:3000");
  console.log(" GraphQL: http://localhost:3000/graphql");
});
