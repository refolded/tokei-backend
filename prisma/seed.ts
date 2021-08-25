import { PrismaClient } from "@prisma/client";
import addUser from "./seed/AddUser";
import addItems from "./seed/AddItem";
import addProject from "./seed/AddProject";
import addWorkspace from "./seed/AddWorkspace";

const prisma = new PrismaClient();

async function main() {
  await prisma.item.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.workspace.deleteMany({});
  await prisma.user.deleteMany({});

  const userPromises = [];
  const projectPromises = [];
  const workspacePromises = [];
  const itemsPromises = [];

  for (let index = 0; index < 10; index += 1) {
    userPromises.push(addUser());
  }
  const users = await Promise.all(userPromises);

  for (let index = 0; index < 10; index += 1) {
    workspacePromises.push(addWorkspace());
  }
  const workspace = await Promise.all(workspacePromises);

  for (let index = 0; index < 10; index += 1) {
    projectPromises.push(addProject());
  }
  const project = await Promise.all(projectPromises);

  for (let index = 0; index < 10; index += 1) {
    itemsPromises.push(addItems());
  }
  const items = await Promise.all(itemsPromises);
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit();
  });
