import { gql } from "apollo-server-express";

export default gql`
  scalar JSON

  type Property {
    id: String
    value: JSON
    itemId: String
    #item: Item
  }

  type Query {
    getAllItemProperties(itemId: String!): [Property]!
  }

  type Mutation {
    createProperty(itemId: String!): Property
    updateProperty(propertyId: String!, newObject: JSON!): Property
    deleteProperty(propertyId: String!): Property
  }
`;
