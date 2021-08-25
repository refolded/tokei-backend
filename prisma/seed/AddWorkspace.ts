import faker from "faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addWorkspace = async () => {
  const workspaceName = await faker.company.companyName();
  const types = ["private", "public"];

  const workspaceType = types[Math.round(Math.random())];

  const WorkspaceUsers = await prisma.user.findMany();

  const randomUserAdmin =
    WorkspaceUsers[Math.floor(Math.random() * WorkspaceUsers.length)];

  const workspace = await prisma.workspace.create({
    data: {
      type: workspaceType,
      name: workspaceName,
      users: {
        connect: WorkspaceUsers.map((c) => ({ id: c.id })),
      },
    },
  });
  const adminInWorkspace = await prisma.adminInWorkspace.create({
    data: {
      userId: randomUserAdmin.id,
      workspaceId: workspace.id,
    },
  });
};

export default addWorkspace;
