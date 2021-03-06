import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getItemById: (_parent: any, args: { itemId: string }) =>
      prisma.item.findUnique({
        where: {
          id: args.itemId,
        },
        include: {
          item: true,
          subItems: true,
          properties: true,
        },
      }),
  },

  Mutation: {
    createItem: (
      _parent: any,
      args: { title: string; description: string }
    ) => {
      const item = prisma.item.create({
        data: { title: args.title, description: args.description },
      });
      return item;
    },

    updateItem: (
      _parent: any,
      args: { id: string; title: string; description: string }
    ) => {
      const item = prisma.item.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          description: args.description,
        },
        include: {
          item: true,
          subItems: true,
        },
      });
      return item;
    },
    deleteItem: (_parent: any, args: { id: string }) => {
      const item = prisma.item.delete({
        where: {
          id: args.id,
        },
        include: {
          item: true,
          subItems: true,
        },
      });
      return item;
    },
  },
};
