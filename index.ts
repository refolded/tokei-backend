import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import schema from "./graphql/schema";
import { context } from "./prisma/context";
import sentryPlugin from "./graphql/plugins/sentry";
// Initialize environment variables
dotenv.config();

// Extract the port from environment
const { PORT } = process.env;

// Create an express app to serve the GraphQL API
const main = async () => {
  // Create an express app
  const app = express();
  // Initialize Sentry
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // TODO: Adjust in production as recommended by docs
    tracesSampleRate: 1.0,
  });

  // Create an apollo server
  const apollo = new ApolloServer({
    schema,
    context,
    plugins: [sentryPlugin],
  });
  // Serve the GraphQL API on the /graphql path
  await apollo.start();
  // Add the apollo server to the express app
  apollo.applyMiddleware({ app });
  // Start the express app
  app.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Apollo is ready on port: ${PORT}`);
  });
};

// Call the main function
main().catch((err) => {
  /* eslint-disable-next-line no-console */
  console.log("Error: ", err);
});
