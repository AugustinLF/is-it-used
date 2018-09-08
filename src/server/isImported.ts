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
    let localImportedName = null;
    const imports = ast.find(j.ImportDeclaration, {
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

            const defaultSpecifier = specifiers.find(
                specifier => specifier.type === 'ImportDefaultSpecifier'
            );
            if (type === 'default' && defaultSpecifier) {
                localImportedName = defaultSpecifier.local.name;
                return true;
            }

            if (type === 'named') {
                specifiers.forEach(specifier => {
                    if (specifier.type === 'ImportSpecifier' && specifier.imported.name === name)
                        localImportedName = specifier.local.name;
                });
                if (localImportedName) return true;
            }
            // handle * as React (ImportNamespaceSpecifier)
            return false;
        },
    });

    // TODO Handle variable shadowing (not necessary for rexport since they are at top-level) and reassignment:
    // let MyComp = ImportedComp

    // The target is not imported, there's not need to continue processing
    if (imports.length === 0) return null;

    const jsxCallsites = ast.find(j.JSXElement, {
        openingElement: {
            name: identifier => identifier.name === localImportedName,
        },
    });

    const defaultExport = ast.find(j.ExportDefaultDeclaration, {
        declaration: {
            name: name => name === localImportedName,
        },
    });
    const namedExport = ast.find(j.ExportNamedDeclaration, {
        declaration: {
            declarations: declarations =>
                declarations.some(declaration => declaration.id.name === localImportedName),
        },
    });

    // handle export {} from
    return {
        used: jsxCallsites.length >= 1,
        defaultExport: defaultExport.length === 1,
        namedExport: namedExport.length === 1 ? localImportedName : null,
    };
};
