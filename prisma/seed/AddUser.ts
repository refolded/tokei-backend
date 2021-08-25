import faker from "faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addUser = async () => {
  const userEmail = await faker.internet.email();
  const userName = await faker.name.findName();
  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      name: userName,
      password: faker.internet.password(),
    },
  });
};

export default addUser;
