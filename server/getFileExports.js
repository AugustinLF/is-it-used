const fs = require('fs');
const j = require('jscodeshift');
const parser = require('flow-parser');

const parse = source => j(source, {parser});

const getDefaultFileExports = targetPath => {
    const fileContent = fs.readFileSync(targetPath).toString();
    const ast = parse(fileContent);
    const defaultExport = ast.find(j.ExportDefaultDeclaration);
    let defaultExportName = null;
    defaultExport.forEach(({value}) => {
        const decl = value && value.declaration;
        if (decl && typeof decl.name === 'string') defaultExportName = decl.name;
    });

    return defaultExport.length === 1
        ? {
              type: 'default',
              name: defaultExportName,
          }
        : null;
};

const getNamedFileExports = targetPath => {
    const fileContent = fs.readFileSync(targetPath).toString();
    const ast = parse(fileContent);
    const namedExports = ast.find(j.ExportNamedDeclaration);
    const fileExports = [];
    namedExports.forEach(namedExport => {
        if (namedExport.value.specifiers) {
            namedExport.value.specifiers.forEach(specifier => {
                fileExports.push({
                    type: 'named',
                    name: specifier.exported.name,
                });
            });
        }
        if (namedExport.value.declaration) {
            namedExport.value.declaration.declarations.forEach(declaration => {
                fileExports.push({
                    type: 'named',
                    name: declaration.id.name,
                });
            });
        }
    });
    return fileExports;
};

module.exports = {
    getDefaultFileExports,
    getNamedFileExports,
};
