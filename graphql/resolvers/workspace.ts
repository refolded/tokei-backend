import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    allWorkspaces: () => prisma.workspace.findMany(),
    getWorkspaceById: (_parent: any, args: { getWorkspace: { id: any } }) =>
      prisma.workspace.findUnique({
        where: {
          id: String(args.getWorkspace.id),
        },
      }),
  },
  Mutation: {
    createWorkspace: (
      _parent: any,
      args: { createdWorkspace: { type: string; name: string } }
    ) => {
      const workspace = prisma.workspace.create({
        data: {
          type: args.createdWorkspace.type,
          name: args.createdWorkspace.name,
        },
      });
      return workspace;
    },
    updateWorkspaceById: (
      _parent: any,
      args: { updatedWorkspace: { id: string; type: string; name: string } }
    ) => {
      const workspace = prisma.workspace.update({
        where: {
          id: args.updatedWorkspace.id,
        },
        data: {
          name: args.updatedWorkspace.name,
          type: args.updatedWorkspace.type,
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
