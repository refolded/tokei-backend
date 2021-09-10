import { gql } from "apollo-server-express";

export default gql`
  type Project {
    id: String
    name: String
    description: String
    workspaceId: String
    workspace: Workspace
    # administrators: [User]
    items: [Item]
    # users: [User]
  }

  type Query {
    getProjectById(id: String): Project
  }
  type Mutation {
    createProject(
      workspaceId: String
      name: String
      description: String
      userId: String
    ): Project # the user creating the project should be an admin in the workspace
    # addAdministrator(id: String, administratorsId: String) # only an admin in the project should be able to add admins
    updateProject(id: String, name: String, description: String): Project # only an admin should be able to edit project
    deleteProject(id: String): Project # only an admin should be able to delete the project
  }
`;
