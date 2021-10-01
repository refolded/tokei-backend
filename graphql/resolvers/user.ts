import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getUserPersonalData: async (_parent: any, args: { userId: string }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: args.userId,
        },
        select: {
          name: true,
          email: true,
          workspaces: true,
          projects: true,
        },
      });
      return user;
    },
  },
  Mutation: {
    createUser: async (
      _parent: any,
      args: { inputData: { name: string; email: string; password: string } }
    ) => {
      const strongPassword = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      );
      const emailPattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      const userExist = await prisma.user.findUnique({
        where: {
          email: args.inputData.email,
        },
        select: {
          email: true,
        },
      });
      if (userExist) {
        throw new Error("You have registered with this email already");
      } else if (!strongPassword.test(args.inputData.password)) {
        throw new Error(
          "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character , and is at least eight characters long"
        );
      } else if (!emailPattern.test(args.inputData.email)) {
        throw new Error("Wrong email");
      } else {
        const user = await prisma.user.create({
          data: {
            name: args.inputData.name,
            email: args.inputData.email,
            password: args.inputData.password,
          },
          select: {
            name: true,
            email: true,
          },
        });
        return user;
      }
    },
    updateUser: async (
      _parent: any,
      args: {
        newData: { name: string; email: string; password: string; id: string };
      }
    ) => {
      const strongPassword = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      );
      const emailPattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (args.newData.email) {
        if (!emailPattern.test(args.newData.email)) {
          throw new Error("Wrong email");
        }
        const userExist = await prisma.user.findUnique({
          where: {
            email: args.newData.email,
          },
          select: {
            email: true,
            name: true,
          },
        });
        if (userExist) {
          throw new Error("This email already exist");
        }
      }

      if (
        args.newData.password &&
        !strongPassword.test(args.newData.password)
      ) {
        throw new Error(
          "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character , and is at least eight characters long"
        );
      } else {
        const updateUser = await prisma.user.update({
          where: {
            id: args.newData.id,
          },
          data: {
            name: args.newData.name,
            email: args.newData.email,
            password: args.newData.password,
          },
        });
        return updateUser;
      }
    },
    removeUser: async (_parent: any, args: { id: string }) => {
      const removedUser = await prisma.user.delete({
        where: {
          id: args.id,
        },
        select: {
          name: true,
          email: true,
        },
      });
      return removedUser;
    },
  },
};
