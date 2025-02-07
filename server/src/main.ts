import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';

import { schema } from './gql/schema';

/**
 * Runs the GraphQL server
 */
async function main(): Promise<void> {
  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info('Server is running on check out the playground http://localhost:4000/graphql');
  });
}

main();
