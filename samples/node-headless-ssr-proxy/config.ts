/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import httpAgents from './httpAgents';
import { ServerBundle, ErrorResponse } from './models';
import { ProxyConfig } from '@sitecore-jss/sitecore-jss-proxy/types/ProxyConfig';
import { IncomingMessage, ServerResponse } from 'http';

// We keep a cached copy of the site dictionary for performance. Default is 60 seconds.
const dictionaryCache = new NodeCache({ stdTTL: 60 });

/**
 * The JSS application name defaults to providing part of the bundle path as well as the dictionary service endpoint.
 * If not passed as an environment variable or set here, any application name exported from the bundle will be used instead.
 */
let appName = process.env.SITECORE_JSS_APP_NAME;

/**
 * The server.bundle.js file from your pre-built JSS app
 */
const bundlePath = process.env.SITECORE_JSS_SERVER_BUNDLE || `./dist/${appName}/server.bundle`;

const serverBundle: ServerBundle = require(bundlePath);

httpAgents.setUpDefaultAgents(serverBundle);

const apiHost = process.env.SITECORE_API_HOST || 'http://my.sitecore.host';

appName = appName || serverBundle.appName;

const config: ProxyConfig & { serverBundle: ServerBundle } = {
  /**
   * The required server.bundle.js file from your pre-built JSS app
   */
  serverBundle,
  /**
   * apiHost: your Sitecore instance hostname that is the backend for JSS
   * Should be https for production. Must be https to use SSC auth service,
   * if supporting Sitecore authentication.
   */
  apiHost,
  /**
   * layoutServiceRoot: The path to layout service for the JSS application.
   * Some apps, like advanced samples, use a custom LS configuration,
   * e.g. /sitecore/api/layout/render/jss-advanced-react
   */
  layoutServiceRoute:
    process.env.SITECORE_LAYOUT_SERVICE_ROUTE || '/sitecore/api/layout/render/jss',
  /**
   * apiKey: The Sitecore SSC API key your app uses.
   * Required.
   */
  apiKey: process.env.SITECORE_API_KEY || serverBundle.apiKey || '{YOUR API KEY HERE}',
  /**
   * pathRewriteExcludeRoutes: A list of absolute paths
   * that are NOT app routes and should not attempt to render a route
   * using SSR. These route prefixes are directly proxied to the apiHost,
   * allowing the proxy to also proxy GraphQL requests, REST requests, etc.
   * Local static assets, Sitecore API paths, Sitecore asset paths, etc should be listed here.
   * URLs will be encoded, so e.g. for a space use '%20' in the exclude.
   *
   * Need to perform logic instead of a flat list? Remove this and use
   * pathRewriteExcludePredicate function instead: (url) => boolean;
   */
  pathRewriteExcludeRoutes: [
    '/dist',
    '/assets',
    '/sitecore/api',
    '/api',
    '/-/jssmedia',
    '/-/media',
    '/layouts/system',
  ].concat((process.env.SITECORE_PATH_REWRITE_EXCLUDE_ROUTES || '').split('|')),
  /**
   * Writes verbose request info to stdout for debugging.
   * Must be disabled in production for reasonable performance.
   */
  debug: (process.env.SITECORE_ENABLE_DEBUG || '').toLowerCase() === 'true' || false,
  /**
   * Maximum allowed proxy reply size in bytes. Replies larger than this are not sent.
   * Avoids starving the proxy of memory if large requests are proxied.
   * Default: 10MB
   */
  maxResponseSizeBytes: 10 * 1024 * 1024,
  /**
   * Options object for http-proxy-middleware. Consult its docs.
   */
  proxyOptions: {
    // Enable connection pooling
    agent: httpAgents.getAgent(apiHost),
    // Setting this to false will disable SSL certificate validation
    // when proxying to a SSL Sitecore instance.
    // This is a major security issue, so NEVER EVER set this to false
    // outside local development. Use a real CA-issued certificate.
    secure: true,
    xfwd: true,
  },
  /**
   * Custom headers handling.
   * You can remove different headers from proxy response.
   */
  setHeaders: (
    _request: IncomingMessage,
    _response: ServerResponse,
    proxyResponse: IncomingMessage
  ) => {
    delete proxyResponse.headers['content-security-policy'];
  },
  /** Callback when an exception is thrown during SSR; decides what to send back to client (500 errors) */
  onError: (_error: Error, response: IncomingMessage): Promise<ErrorResponse> => {
    const result: ErrorResponse = {
      statusCode: response.statusCode,
    };

    if (result.statusCode === 500 || result.statusCode === 200) {
      result.content = fs.readFileSync('error.html', 'utf8');
    }

    return Promise.resolve(result);
  },
  createViewBag: (
    _request: IncomingMessage,
    _response: ServerResponse,
    _proxyResponse: IncomingMessage,
    layoutServiceData: any
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<object> => {
    // fetches the dictionary from the Sitecore server for the current language so it can be SSR'ed
    // has a default cache applied since dictionary data is quite static and it helps rendering performance a lot
    if (!layoutServiceData || !layoutServiceData.sitecore || !layoutServiceData.sitecore.context) {
      return Promise.resolve({});
    }

    // TODO: fallback language should come from app configuration
    const language = layoutServiceData.sitecore.context.language || 'en';
    const site =
      layoutServiceData.sitecore.context.site && layoutServiceData.sitecore.context.site.name;

    if (!site) {
      return Promise.resolve({});
    }

    const cacheKey = `${site}_${language}`;

    const cached = dictionaryCache.get(cacheKey);

    // eslint-disable-next-line @typescript-eslint/ban-types
    if (cached) return Promise.resolve(cached as object);

    return fetch(
      `${config.apiHost}/sitecore/api/jss/dictionary/${appName}/${language}?sc_apikey=${config.apiKey}`,
      {
        headers: {
          connection: 'keep-alive',
        },
      }
    )
      .then((result) => result.json())
      .then((json) => {
        const viewBag = {
          dictionary: json && json.phrases,
        };

        dictionaryCache.set(cacheKey, viewBag);
        return viewBag;
      });
  },
};

export default config;
