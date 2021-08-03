import express from "express";
import dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";

// Initialize environment variables
dotenv.config();

// Extract the port from environment
const { PORT } = process.env;

// Define an example type for GQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define resolvers for the typeDefs
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

// Create an express app to serve the GraphQL API
const main = async () => {
  // Create an express app
  const app = express();
  // Create an apollo server
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });
  // Serve the GraphQL API on the /graphql path
  await apollo.start();
  // Add the apollo server to the express app
  apollo.applyMiddleware({ app });
  // Start the express app
  app.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server started on port ${PORT}`);
  });
};

// Call the main function
main().catch((err) => {
  /* eslint-disable-next-line no-console */
  console.log("Error: ", err);
});
