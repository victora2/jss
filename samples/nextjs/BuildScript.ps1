jss setup --instancePath $SITECORE_API_HOST --apiKey $SITECORE_API_KEY --deployUrl "$SITECORE_API_HOST/sitecore/api/jss/import" --deploySecret $JSS_DEPLOY_SECRET --nonInteractive --skipValidation | Out-Null;
jss deploy items --includeContent --includeDictionary;
npm run build;