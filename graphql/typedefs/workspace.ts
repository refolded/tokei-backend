import { gql } from "apollo-server-express";
// import { Workspace as workspace, User } from "../../types/types";

export default gql`
  type Workspace {
    id: String!
    type: String!
    name: String!
    # projects: [Project]
    # administrators: [AdminInWorkspace]
    # users: [User]
  }
  input WorkspaceInput {
    id: String
    type: String!
    name: String!
    # projects: [Project]
    # administrators: [AdminInWorkspace]
    # users: [User]
  }
  type Query {
    allWorkspaces: [Workspace]!
    getWorkspaceById(id: String!): Workspace
  }

  type Mutation {
    createWorkspace(createdWorkspace: WorkspaceInput): Workspace
    updateWorkspaceById(updatedWorkspace: WorkspaceInput): Workspace
    deleteWorkspaceById(id: String!): Workspace
  }
`;
