import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs } from './resolvers';

const httpLink = createHttpLink({
  uri: 'http://drupal-outline.lndo.site/outline-graphql',
});

const cache = new InMemoryCache();
const resolvers = {};

cache.writeData({
  data: {
    outlines: [
      {
        __typename: 'Outline',
        eid: 1,
        name: 'Outline 1',
        active: true,
      },
      {
        __typename: 'Outline',
        eid: 2,
        name: 'Outline 2',
        active: false,
      },
    ]
  },
});
console.log(cache)

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});
