import { gql } from "apollo-server-express";
// import { Workspace as workspace, User } from "../../types/types";

export default gql`
  type Workspace {
    id: String!
    type: String!
    name: String!
    projects: [Project]
    # administrators: [User]
    # users: [User]
  }

  type Query {
    getAllWorkspaces: [Workspace]!
    getWorkspaceById(id: String!): Workspace
  }

  type Mutation {
    createWorkspace(type: String, name: String): Workspace
    updateWorkspaceById(id: String, type: String, name: String): Workspace
    deleteWorkspaceById(id: String!): Workspace
  }
`;
