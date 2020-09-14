# Docs for Sitecore JSS

# Setup

**First** run `npm i` to install dependencies.

**Second**, if you have not already, install the JSS CLI: `npm install -g @sitecore-jss/sitecore-jss-cli`.

## Development

Use `jss start` to run a local development server. It will start by default on `http://localhost:3001`.

## Deploy app to Azure

1. Use `jss setup` to configure app:
	* layoutServiceHost - it is hostname of your node-headless-proxy
	* deployUrl - it is CM instance
1. Set hostName in `sitecore/jss-basic-app.config` as CD instance (without protocol). Set database as `web`
1. Copy sitecore/config: site and deploysecret to: CM Include/zzz
1. Copy sitecore/config: site to: CD Include/zzz
1. Use `jss deploy items -c -d` to deploy items
1. Remove Sitecore item: `/sitecore/system/Workflows/JSS Development Workflow/Content Mode/Publish/Validation Action`
1. Pass workflow using Workbox
1. Publish items to `web` database
1. Use `jss build:ssr` to run build for node-headless-proxy
1. In node-headless-proxy app:
	* Create folders `/dist/JssDocs`
	* Copy content of `docs/dist` folder to `node-headless-proxy/dist/JssDocs`
	* Setup env variables in `node-headless-proxy/config.js` at the start of file, like (replace SITECORE_API_HOST, SITECORE_API_KEY by your values):
	```
	process.env.SITECORE_JSS_APP_NAME = 'jssdocs'
	process.env.SITECORE_JSS_SERVER_BUNDLE = './dist/JssDocs/server.bundle.js'
	process.env.SITECORE_API_HOST = 'https://sitecoremanagementservices1000xm-163-cd.azurewebsites.net'
	process.env.SITECORE_API_KEY = '{1B42637F-963E-41AC-A9CA-357640D68B2E}'
	```
1. Copy node-headless-proxy app to your Azure Web app
1. Use SSH to run `npm i` inside Web app

`
In order to copy node-headless-proxy files to Azure App Service, use: Deployment Center -> ftp
`
## Contributing

The JSS docs are a JSS site, with a markdown-to-routes parser added. This means the documentation is authored in Markdown, and served via SSR'ed JSS in production using disconnected mode.

* `/data/routes/docs` -> the main documentation content area
* `src/app/sidenav.js` -> registers the structure of the docs navigation
