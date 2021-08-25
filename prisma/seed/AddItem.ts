import faker from "faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addItems = async () => {
  const itemTitle = await faker.internet.userName();
  const itemDesc = await faker.commerce.productDescription();

  const projects = await prisma.project.findMany();
  const randomProject = projects[Math.floor(Math.random() * projects.length)];

  const item = await prisma.item.create({
    data: {
      title: itemTitle,
      description: itemDesc,
      projects: {
        connect: {
          id: randomProject.id,
        },
      },
    },
  });
};

export default addItems;
