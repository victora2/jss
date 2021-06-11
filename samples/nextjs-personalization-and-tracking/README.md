# Simple Sitecore JSS Next.js Sample Application with Personalization & Tracking

## Local environment setup

*Note: this sample requires a Sitecore instance with installed Sitecore Management Services package on CM. Disconnected mode is not supported.*

1. Create a new app based on this starter using JSS CLI via `jss create app-name nextjs-personalization-and-tracking`.

2. Create a API Key item in your Sitecore instance.

3. Navigate to your app folder and create configuration using JSS CLI via `jss setup`. Customize your hostname and API Key in this step.

4. Update `sitecore\config\JssNextPersonalizationWeb.config` with your hostname and API.

5. Deploy configs to your local Sitecore instance via `jss deploy config`.

6. Install Sitecore CLI using powershell. `dotnet tool restore`.

7. Authorize Sitecore CLI to interact with your Sitecore instance

`dotnet sitecore login --cm https://cm.hostname/ --auth https://identity.hostname/ --allow-write true`

8. Deploy serialized items via `dotnet sitecore ser push`.

9. Publish site from Content Editor.

10. Start app via `jss start:connected` in dev mode or `jss start` in production mode. Browse http://localhost:3000.
