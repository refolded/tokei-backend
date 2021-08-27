import { PrismaClient } from "@prisma/client";
import { IdleTransaction } from "@sentry/tracing";

const prisma = new PrismaClient();

export default {
  Query: {
    getAllItemProperties: (_parent: any, args: { itemId: any }) =>
      prisma.property.findMany({
        where: {
          itemId: args.itemId,
        },
      }),
  },
  // Mutation: {},
};
