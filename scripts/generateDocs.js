const fs = require('fs')
const TypeDoc = require('typedoc')
const options = require('../typedoc.js')
const path = require('path')

const generateDocs = (packageDirectory) => {
    console.log(packageDirectory);
    const name = packageDirectory.name
    const app = new TypeDoc.Application()
    app.options.addReader(new TypeDoc.TypeDocReader());
    app.options.addReader(new TypeDoc.TSConfigReader());
    app.options.addDeclaration({ name });
    app.bootstrap(options)
    // dynamically sets entry point to current packageDirectory's src/index.ts
    app.options.setValue("entryPoints", path.resolve(name, 'src/index.ts'))
    console.log(app.options.getValue('entryPoints'));
    console.log(app.options)
    // console.log(app.options);
    const project = app.convert(app.expandInputFiles([`packages/${name}/src/index.ts`]));
    if (project) {
      app.generateJson(project, `docs-json/${name}.json`);
    }
}

fs.readdirSync('./packages', { withFileTypes: true })
.filter(item=> item.isDirectory() && item.name === 'sitecore-jss')
.forEach(item => generateDocs(item))

//   .filter(item => item.isDirectory())
//   .filter(item => fs.existsSync(path.resolve('./packages', item.name, 'src/index.ts')))
//   .forEach(generateDocs);
