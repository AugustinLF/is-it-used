const fs = require('fs');
const j = require('jscodeshift');
const path = require('path');

// This should use @babel/parser
const parse = source => j(source, {parser: require('flow-parser')});

// target is an absolutePath
export const isImported = (file, target) => {
    const fileContent = fs.readFileSync(file).toString();
    const ast = parse(fileContent);
    const absolutePath = path.resolve(file);
    const collection = ast.find(j.ImportDeclaration, {
        source: {
            value: importName => {
                const {dir: origin} = path.parse(absolutePath);
                // TODO handle extension
                const importedAbsolutePath = path.join(origin, importName) + '.js';
                return importedAbsolutePath === path.resolve(target.path);
            },
        },
        specifiers: specifiers => {
            const {type, name} = target;
            if (
                type === 'default' &&
                specifiers.some(specifier => specifier.type === 'ImportDefaultSpecifier')
            )
                return true;

            if (
                type === 'named' &&
                specifiers.some(
                    specifier =>
                        specifier.type === 'ImportSpecifier' && specifier.imported.name === name
                )
            )
                return true;
            // handle * as React (ImportNamespaceSpecifier)
            return false;
        },
    });

    return collection.length >= 1;
};
