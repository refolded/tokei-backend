import { gql } from "apollo-server-express";

export default gql`
  scalar JSON

  type Block {
    id: String
    content: JSON
    itemId: String
    type: String
  }

  type Query {
    getBlockById(id: String!): Block
  }

  type Mutation {
    createBlock(itemId: String, type: String): Block
    updateBlockById(id: String, content: JSON, type: String): Block
    deleteBlockById(id: String): Block
  }
`;
