const express = require('express');
const compression = require('compression');
const scProxy = require('@sitecore-jss/sitecore-jss-proxy').default;
const config = require('./config');
const cacheMiddleware = require('./cacheMiddleware');

const server = express();
const port = process.env.PORT || 3000;

// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

// Serve static app assets from local /dist folder
server.use(
  '/dist',
  express.static('dist', {
    fallthrough: false, // force 404 for unknown assets under /dist
  })
);

let redirectPromise;

server.use('*', (req, res, next) => {
  if (redirectPromise === undefined) {
    // cache list of redirects in memory
    redirectPromise = config.getRedirects();
  }

  redirectPromise.then(redirects => {
    if (redirects && redirects.hasOwnProperty(req.baseUrl)) {
      req.url = redirects[req.baseUrl];
      res.redirect(301, req.url);
    } else {
      next();
    }
  }).catch(error => {
    console.log(error);
    next();
  });
});

/**
 * Output caching, can be enabled,
 * Read about restrictions here: {@link https://jss.sitecore.com/docs/techniques/performance/caching}
 */
// server.use(cacheMiddleware());

// For any other requests, we render app routes server-side and return them
server.use('*', scProxy(config.serverBundle.renderView, config, config.serverBundle.parseRouteUrl));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});

function getRedirects() {
  const graphQLClient = GraphQLClientFactory(config.graphQLEndpoint, true);
  return graphQLClient
    .query(config.graphQLEndpoint, {
      query: `
        query {
          search(fieldsEqual: [{ name: "_templatename", value: "Redirect Route" }]) {
            results {
              items {
                item {
                  url
                  field(name: "Destination") {
                    ... on LinkField {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `,
    })
    .then((result) => {
      return result.data.search.results.items.reduce((redirects, searchResult) => {
        const source = searchResult.item?.url;
        const destination = searchResult.item?.field?.url;

        if (source && destination) {
          redirects[getNormalizedPath(source)] = getNormalizedPath(destination);
        }

        console.log(JSON.stringify(redirects, null, 4));
        return redirects;
      }, {});
    });
}
