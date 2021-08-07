import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

const path = require("path");

const typesArray = loadFilesSync(path.join(__dirname, "./typedefs"));
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers"));
const resolvers = mergeResolvers(resolversArray);

export default makeExecutableSchema({ typeDefs, resolvers });
