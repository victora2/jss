const TypeDoc = require('typedoc');
const path = require('path');
const fs = require('fs');
const options = require('./../typedoc.js');

function generateDocs(packageDirectory) {
  const name = packageDirectory.name;
  const app = new TypeDoc.Application();
  app.options.addDeclaration({ name });
  app.options.addReader(new TypeDoc.TypeDocReader());
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.bootstrap(options);
  const project = app.convert(app.expandInputFiles([`packages/${name}/src/index.ts`]));
  if (project) {
    //app.generateJson(project, `docs-json/${name}.json`);
    app.generateDocs(app.expandInputFiles([`packages/${name}/src/index.ts`]), 'docs2');
  }
  
}

fs.readdirSync('./packages', { withFileTypes: true })
  .filter(item => item.isDirectory())
  .forEach(generateDocs);
