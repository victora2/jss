import { GraphQLRequestClient } from '../src/graphql-request-client';
import fs from 'fs';
import { getIntrospectionQuery } from 'graphql';

const jssConfig = {
  graphQLEndpoint: 'https://cm.jssdev.localhost/sitecore/api/graph/edge',
  sitecoreApiKey: '{6BB2FB79-B9BE-432E-8487-CD07D6D4563B}',
};

const client = new GraphQLRequestClient(jssConfig.graphQLEndpoint, {
  apiKey: jssConfig.sitecoreApiKey,
});

client
  .request(getIntrospectionQuery())
  .then((result) => {
    fs.writeFile('./build/schema.json', JSON.stringify(result, null, 2), (err) => {
      if (err) {
        console.error('Error writing GraphQLIntrospectionResult file', err);
        return;
      }

      console.log('GraphQL Introspection Data successfully fetched!');
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
