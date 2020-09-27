import gql from 'graphql-tag';

export const typeDefs = gql`
  type Outline {
    eid: ID!
    name: String!
    active: Boolean!
  }
`;