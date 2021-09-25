import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getBlockById: (_parent: any, args: { id: string }) => {
      const block = prisma.block.findUnique({
        where: {
          id: args.id,
        },
      });
      return block;
    },
  },
  Mutation: {
    createBlock: (_parent: any, args: { itemId: string; type: string }) => {
      const block = prisma.block.create({
        data: {
          content: {},
          itemId: args.itemId,
          type: args.type,
        },
      });
      return block;
    },
    updateBlock: (
      _parent: any,
      args: { content: object; id: string; type: string }
    ) => {
      const block = prisma.block.update({
        where: {
          id: args.id,
        },
        data: {
          content: args.content,
          type: args.type,
        },
      });
      return block;
    },
  },
};
