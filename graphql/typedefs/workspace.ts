import { gql } from "apollo-server-express";

export default gql`
  type Workspace {
    id: ID!
    type: String!
    # projects: [Project]
    # adminstrators: [AdminInWorkspace]
    # users: [User]
  }
  type Query {
    allWorkspaces: [Workspace]!
  }
`;
