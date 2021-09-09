import { gql } from "apollo-server-express";

export default gql`
  type Item {
    id: String
    title: String
    description: String
    itemId: String
    item: Item
    # blocks: [Block] # we should be able to change this
    subItems: [Item]
    # projects: [Project] # we should be able to change this
    properties: [Property]
  }

  type Query {
    getItemByID(itemId: String!): Item
  }

  type Mutation {
    createItem(title: String, description: String): Item
    updateItem(id: String, title: String, description: String): Item
    deleteItem(id: String): Item
  }
`;
