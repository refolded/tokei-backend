import { GraphQLRequestListener } from "apollo-server-plugin-base";
import { ApolloError } from "apollo-server-express";
import * as Sentry from "@sentry/node";
import { Context } from "../../prisma/context";

const sentryPlugin = {
  async requestDidStart(): Promise<GraphQLRequestListener<Context>> {
    /* Within this returned object, define functions that respond
           to request-specific lifecycle events. */
    return {
      async didEncounterErrors(ctx) {
        // If we couldn't parse the operation, don't
        // do anything here
        if (!ctx.operation) {
          return;
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const err of ctx.errors) {
          // Only report internal server errors,
          // all errors extending ApolloError should be user-facing
          if (err instanceof ApolloError) {
            // eslint-disable-next-line no-continue
            continue;
          }

          // Add scoped report details and send to Sentry
          Sentry.withScope((scope) => {
            // Annotate whether failing operation was query/mutation/subscription
            scope.setTag("kind", ctx.operation?.operation);

            // Log query and variables as extras (make sure to strip out sensitive data!)
            scope.setExtra("query", ctx.request.query);
            scope.setExtra("variables", ctx.request.variables);

            if (err.path) {
              // We can also add the path as breadcrumb
              scope.addBreadcrumb({
                category: "query-path",
                message: err.path.join(" > "),
                level: Sentry.Severity.Debug,
              });
            }

            const transactionId =
              ctx.request.http?.headers.get("x-transaction-id");
            if (transactionId) {
              scope.setTransactionName(transactionId);
            }

            Sentry.captureException(err);
          });
        }
      },
    };
  },
};
export default sentryPlugin;
