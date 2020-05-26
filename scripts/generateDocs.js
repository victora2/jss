const fs = require('fs');
const TypeDoc = require('typedoc');

function generateDocs(packageDirectory) {
  const name = packageDirectory.name;
  const app = new TypeDoc.Application();
  app.options.addReader(new TypeDoc.TypeDocReader());
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addDeclaration({ name });
  const project = app.convert(app.expandInputFiles([`packages/${name}/src/index.ts`]));
  if (project) {
    app.generateJson(project, `docs-json/${name}.json`);
  }
}

fs.readdirSync('./packages', { withFileTypes: true })
  .filter(item => item.isDirectory())
  .forEach(generateDocs);
