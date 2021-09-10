import { PrismaClient } from ".prisma/client";
import { Item } from "../../types/types";

const prisma = new PrismaClient();

export default {
  Query: {
    getProjectById: (_parent: any, args: { id: string }) =>
      prisma.project.findUnique({
        where: {
          id: args.id,
        },
        include: {
          administrators: true,
          items: true,
          workspace: true,
          users: true,
        },
      }),
  },
  Mutation: {
    createProject: (
      _parent: any,
      args: {
        workspaceId: string;
        name: string;
        description: string;
        userId: string;
      }
    ) => {
      const project = prisma.project.create({
        data: {
          workspaceId: args.workspaceId,
          name: args.name,
          description: args.description,
        },
        include: {
          administrators: true,
          items: true,
          workspace: true,
          users: true,
        },
      });
      return project;
    },
    updateProject: (
      _parent: any,
      args: { id: string; name: string; description: string }
    ) => {
      const project = prisma.project.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          description: args.description,
        },
        include: {
          administrators: true,
          items: true,
          workspace: true,
          users: true,
        },
      });
      return project;
    },
    deleteProject: (_parent: any, args: { id: string }) => {
      const project = prisma.project.delete({
        where: {
          id: args.id,
        },
        include: {
          administrators: true,
          items: true,
          workspace: true,
          users: true,
        },
      });
      return project;
    },
  },
};
