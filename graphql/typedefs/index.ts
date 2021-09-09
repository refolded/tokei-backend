import { gql } from "apollo-server-express";
import {
  User,
  Workspace,
  Project,
  Item,
  Property,
  Block,
} from "../../types/types";

export default gql`
  type Query {
    hello: String
  }
`;
