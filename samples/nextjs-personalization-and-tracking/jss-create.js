const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { applyNameToProject } = require('@sitecore-jss/sitecore-jss-cli/dist/create');
const { execSync } = require('child_process');

/**
 * This function is invoked by `jss create` when an app based on this template is created.
 * It should perform tasks necessary to instantiate the app according to the argv, which
 * correspond to the allowed arguments of `jss create`.
 *
 * Note: npm packages for the new app are already installed before this script is run.
 * Note: this file is deleted in the new app after it has been run.
 *
 * @param {object} argv Arguments passed to `jss create` script
 * @param {string[]} nextSteps Array of default 'next steps' to show at the console
 * @returns {string[]} The next steps to display to the console user (enables customization from this script)
 */
module.exports = function createJssProject(argv, nextSteps) {
  console.log(`Executing create script: ${__filename}...`);

  applyNameToProject(__dirname, argv.name, argv.hostName, 'JssNextPersonalizationWeb');

  if (!argv.prerender) {
    nextSteps.push(
      `* Did you know you can customize the Next.js sample app using ${chalk.green(
        'jss create'
      )} parameters?`,
      `*  ${chalk.green(
        '--prerender {SSG|SSR}'
      )} : Specifies the Next.js pre-rendering form for the optional catch-all route. Default is SSG.`
    );
  }

  setPrerender(argv.prerender);
  setNextConfig();
  removeDependencies();

  return nextSteps;
};

/**
 * Sets the Next.js pre-rendering form for the optional catch-all route.
 * @param {string} [prerender] {SSG|SSR} Default is SSG.
 */
function setPrerender(prerender) {
  const defaultRouteFile = path.join(__dirname, 'src/pages/[[...path]].tsx');
  const ssrRouteFile = path.join(__dirname, 'src/pages/[[...path]].SSR.tsx');
  const sitemapFile = path.join(__dirname, 'src/lib/sitemap-fetcher.ts');
  const Prerender = {
    SSG: 'ssg',
    SSR: 'ssr',
  };
  let value = prerender ? prerender.toLowerCase() : Prerender.SSG;

  if (value !== Prerender.SSG && value !== Prerender.SSR) {
    console.warn(chalk.yellow(`Unsupported prerender value '${prerender}'. Using default 'SSG'.`));
    value = Prerender.SSG;
  }

  console.log(chalk.cyan(`Applying ${value.toUpperCase()} prerender...`));

  switch (value) {
    case Prerender.SSG:
      fs.unlinkSync(ssrRouteFile);
      break;

    case Prerender.SSR:
      fs.unlinkSync(defaultRouteFile);
      fs.renameSync(ssrRouteFile, defaultRouteFile);
      fs.unlinkSync(sitemapFile);
      break;
  }
}

/**
 * Switch development next.config.js to production config
 */
function setNextConfig() {
  const nextConfig = path.join(__dirname, 'next.config.js');
  const baseConfig = path.join(__dirname, 'next.config.base.js');

  console.log(chalk.cyan('Replacing next.config...'));

  fs.unlinkSync(nextConfig);
  fs.renameSync(baseConfig, nextConfig);
}

/**
 * Remove dependencies which are not used in production environment
 */
function removeDependencies() {
  console.log(chalk.cyan('Removing unused dependencies...'));

  execSync(`cd ${__dirname} && npm un --save-dev next-transpile-modules`);
}
