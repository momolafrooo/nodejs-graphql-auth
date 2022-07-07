import { ApolloServer } from "apollo-server";
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";
import "dotenv/config";
import mongoose from "mongoose";

/**
 * Connect mongodb database
 */
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.info("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
