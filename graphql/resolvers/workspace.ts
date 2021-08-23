import { PrismaClient } from "@prisma/client";
import { Workspace } from "../../types/types";

const prisma = new PrismaClient();

export default {
  Query: {
    allWorkspaces: () => prisma.workspace.findMany(),
    getWorkspaceById: (_: any, { id }: { id: any }) =>
      prisma.workspace.findUnique({
        where: {
          id: String(id),
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
  },
};
