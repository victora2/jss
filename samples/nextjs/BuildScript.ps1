npm install -g @sitecore-jss/sitecore-jss-cli;
jss setup --layoutServiceHost $SITECORE_API_HOST --apiKey $SITECORE_API_KEY --deployUrl "$SITECORE_API_HOST/sitecore/api/jss/import" --deploySecret $JSS_DEPLOY_SECRET --nonInteractive --skipValidation;
npm run build;
jss deploy items --includeContent --includeDictionary;