import http from 'http';
import https from 'https';

export interface ServerBundle {
  /**
   * Main entry point to the application when run via Server-Side Rendering, either in Integrated
   * Mode, or with a Node proxy host like the node-headless-ssr-proxy sample.
   * This function will be invoked by the server to return the rendered HTML.
   * @param {Function} callback Function to call when rendering is complete.
   * @param {string} path Current route path being rendered
   * @param {string} data JSON Layout service data for the rendering from Sitecore
   * @param {string} viewBag JSON view bag data from Sitecore (extensible context stuff)
   */
  renderView: (
    callback: (error: unknown, successData: unknown) => void,
    path: string,
    data: unknown,
    viewBag: unknown
  ) => void;

  /**
   * Parses an incoming url to match against the route table. This function is implicitly used
   * by node-headless-ssr-proxy when rendering the site in headless mode. It enables rewriting
   * the incoming path before sending it to Layout Service.
   * For example, '/en-US/hello' can be rewritten to { sitecoreRoute: '/hello', lang: 'en-US' }.
   * This function is _not_ used in integrated mode, as Sitecore's built in route parsing is used.
   * parseRouteUrl is optional; it can be excluded if no URL transformations are required (i.e.
   * single language site).
   * @param {string} url The incoming URL to the proxy server
   * @returns { { sitecoreRoute?: string, lang?: string } } Data to send to Layout Service
   */
  parseRouteUrl?: (url: string) => { sitecoreRoute?: string; lang?: string };
  setUpDefaultAgents?: (httpAgent: http.Agent, httpsAgent: https.Agent) => void;
  apiKey: string;
  appName: string;
}

export type ErrorResponse = {
  statusCode?: number;
  content?: string | undefined;
};
