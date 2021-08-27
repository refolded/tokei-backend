import { PrismaClient } from "@prisma/client";

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
  Mutation: {
    createProperty: (_parent: any, args: { itemId: any }) => {
      const property = prisma.property.create({
        data: {
          itemId: args.itemId,
        },
      });
      return property;
    },
  },
};
