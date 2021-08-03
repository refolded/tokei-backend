import express from "express";
import dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";

dotenv.config();

const { PORT } = process.env;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const main = async () => {
  const app = express();

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apollo.start();

  apollo.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
