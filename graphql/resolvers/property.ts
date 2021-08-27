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
          value: {},
        },
      });
      return property;
    },
    updateProperty: (_parent: any, args: { id: string; value: any }) => {
      const property = prisma.property.update({
        where: {
          id: args.id,
        },
        data: {
          value: args.value,
        },
      });
      return property;
    },
    deleteProperty: (_parent: any, args: { id: string }) => {
      const property = prisma.property.delete({
        where: {
          id: String(args.id),
        },
      });
      return property;
    },
  },
};
