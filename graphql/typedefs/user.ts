import { gql } from "apollo-server-express";

export default gql`
  scalar JSON

  type User {
    id: String!
    email: String!
    name: String!
    password: String!
    workspaces: [Workspace!]! # could be empty, but not null
    projects: [Project!]!
  }
  type Query {
    getUserPersonalData(userId: String): User
  }
  input UserInput {
    email: String!
    name: String!
    password: String!
  }
  input UpdateUser {
    id: String!
    email: String
    name: String
    password: String
  }
  type Mutation {
    createUser(inputData: UserInput): User
    updateUser(newData: UpdateUser): User
    removeUser(id: String!): User
  }
`;
