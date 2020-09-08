import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://drupal-outline.lndo.site/outline-graphql',
});

const cache = new InMemoryCache();
const resolvers = {};

// cache.writeData({ data: { outlines: [] } });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
});
