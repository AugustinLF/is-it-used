const fs = require('fs');
const j = require('jscodeshift');
const path = require('path');

// This should use @babel/parser
const parse = source => j(source, {parser: require('flow-parser')});

const cardPath = './fixtures/documentCard.js';
// Ok, we know it's a default export, now we want to find if it imports it

const isImported = (file, target) => {
    const fileContent = fs.readFileSync(file).toString();
    const ast = parse(fileContent);
    const absolutePath = path.resolve(file);
    const collection = ast.find(j.ImportDeclaration, {
        source: {
            value: importName => {
                const {dir: origin} = path.parse(absolutePath);
                // TODO handle extension
                const importedAbsolutePath = path.join(origin, importName) + '.js';
                return importedAbsolutePath === target.absolutePath;
            },
        },
        specifiers: specifiers => {
            if (specifiers.some(specifier => specifier.type === 'ImportDefaultSpecifier'))
                return true;
            return false;
        },
    });

    return collection.length >= 1;
};
