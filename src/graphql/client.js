import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  // uri: 'https://localhost:32778',
  uri: 'http://drupal-outline.lndo.site/outline-graphql',
});

const cache = new InMemoryCache();
const resolvers = {};

//cache.writeData({ data: { favoriteCharacters: [] } });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
});
