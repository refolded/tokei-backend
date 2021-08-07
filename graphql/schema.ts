import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

const path = require("path");
// import typedefs files automatically
const typesArray = loadFilesSync(path.join(__dirname, "./typedefs"));
// merge typedefs
const typeDefs = mergeTypeDefs(typesArray);

// import resolvers files automatically
const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers"));
// merge resolvers
const resolvers = mergeResolvers(resolversArray);

export default makeExecutableSchema({ typeDefs, resolvers });
