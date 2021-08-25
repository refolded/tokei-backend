import faker from "faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addProject = async () => {
  const projectName = await faker.commerce.product();
  const projectDescription = await faker.commerce.productDescription();
  const projectWorkspace = await prisma.workspace.findMany();

  // const projectUsers = await prisma.user.findMany();

  const randomWorkspace =
    projectWorkspace[Math.floor(Math.random() * projectWorkspace.length)];

  const randomWorkspaceUsers = await prisma.workspace.findUnique({
    where: {
      id: randomWorkspace.id,
    },
    include: {
      users: true,
    },
  });

  if (randomWorkspaceUsers) {
    const randomUserAdmin =
      randomWorkspaceUsers.users[
        Math.floor(Math.random() * randomWorkspaceUsers.users.length)
      ];
    const project = await prisma.project.create({
      data: {
        name: projectName,
        description: projectDescription,
        workspace: {
          connect: {
            id: randomWorkspace.id,
          },
        },
        users: {
          connect: randomWorkspaceUsers.users.map((c) => ({ id: c.id })),
        },
      },
    });
    if (randomUserAdmin) {
      const adminInProject = await prisma.adminInProject.create({
        data: {
          userId: randomUserAdmin.id,
          projectId: project.id,
        },
      });
    }
  }
};

export default addProject;
