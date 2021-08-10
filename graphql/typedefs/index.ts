import { gql } from "apollo-server-express";
import { User, Workspace, Project, Item, PropertyCollection, Block } from "../../types/types";

export default gql`
  type Query {
    hello: String
  }
`;
