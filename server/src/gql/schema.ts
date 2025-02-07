import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from './resolvers';
import typeDefs from './typedefs';

/**
 * GraphQL schema
 */
export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
