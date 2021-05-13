const path = require('path')

module.exports = {
  "plugin": 'typedoc-plugin-markdown',
  "exclude": [
    "(bin|**)/*+(index|.test).ts",
    "**/node_modules/**",
    "**/types",
    "**/dist",
    "**/src/customTypes",
    "**/src/components/*.test.tsx",
    "**/src/**/*.test.ts",
    "**/src/testData/*.ts",
    "**/samples/**",
    "**/src/**/*.*.spec.ts"
  ],
  "disableSources": true,
  "excludeExternals": true,
  "excludePrivate": true,
  "hideGenerator": true,
  "readme": "none",
  "gitRevision": "master",
  "tsconfig": path.join(__dirname, './tsconfig.json'),
  "out": path.join(__dirname, 'docs')
  // "excludeNotExported": true,
  // "experimentalDecorators": true,
  // "emitDecoratorMetadata": true,
  // "ignoreCompilerErrors": true,
  // "includeDeclarations": false,
  // "mode": "modules",
  // "skipSidebar": true,
  // "theme": path.join(__dirname, './jss-docs-theme'),
};