import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getAllWorkspaces: () => prisma.workspace.findMany(),

    getWorkspaceById: (_parent: any, args: { id: any }) =>
      prisma.workspace.findUnique({
        where: {
          id: String(args.id),
        },
        include: {
          projects: true,
        },
      }),
  },
  Mutation: {
    createWorkspace: (
      _parent: any,
      args: { type: string; name: string; userId: string }
    ) => {
      const workspace = prisma.workspace.create({
        data: {
          type: args.type,
          name: args.name,
          administrators: {
            connect: {
              id: args.userId,
            },
          },
          users: {
            connect: {
              id: args.userId,
            },
          },
        },
      });
      return workspace;
    },
    updateWorkspaceById: (
      _parent: any,
      args: { id: string; type: string; name: string; adminId: string }
    ) => {
      const workspace = prisma.workspace.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          type: args.type,
        },
      });
      return workspace;
    },
    deleteWorkspaceById: (_parent: any, args: { id: string }) => {
      const workspace = prisma.workspace.delete({
        where: {
          id: String(args.id),
        },
      });
      return workspace;
    },
  },
};
