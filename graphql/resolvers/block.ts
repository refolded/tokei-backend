import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getBlockById: (_parent: any, args:{id: string}) => {
        prisma.block.findUnique({
            where: {
                id: args.id,
            }
        });
    }

    
  },
  Mutation: {
   
  },
};
