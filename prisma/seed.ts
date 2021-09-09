/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import addUser from "./seed/AddUser";
import addItems from "./seed/AddItem";
import addProject from "./seed/AddProject";
import addWorkspace from "./seed/AddWorkspace";

const prisma = new PrismaClient();

async function main() {
  console.log("Deleting existing entries...");

  await prisma.item.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.workspace.deleteMany({});
  await prisma.user.deleteMany({});

  const userPromises = [];
  const projectPromises = [];
  const workspacePromises = [];
  const itemsPromises = [];

  console.log("Creating Users...");
  for (let index = 0; index < 10; index += 1) {
    userPromises.push(addUser());
  }
  await Promise.all(userPromises);

  console.log("Creating Workspaces...");
  for (let index = 0; index < 10; index += 1) {
    workspacePromises.push(addWorkspace());
  }
  await Promise.all(workspacePromises);

  console.log("Creating Projects...");
  for (let index = 0; index < 10; index += 1) {
    projectPromises.push(addProject());
  }
  await Promise.all(projectPromises);

  console.log("Creating Items...");
  for (let index = 0; index < 10; index += 1) {
    itemsPromises.push(addItems());
  }
  await Promise.all(itemsPromises);
}

main()
  .then(() => {
    console.log("Seeding complete. Run prisma studio to validate.");
    prisma.$disconnect();
  })
  .catch((e) => {
    process.exit(1);
  });
