import gql from 'graphql-tag';

export const outlinesQuery = gql`
  {
    outlines @client {
        outlines {
            eid
            name
            active
        }
    }
  }
`;