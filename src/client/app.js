import * as React from 'react';
import {QueryRenderer, graphql} from 'react-relay';

import environment from './relayEnvironment';
import FileList from './fileList';
import Callsites from './callsites';

class App extends React.Component {
    state = {
        file: null,
        export: null,
    };
    render() {
        return (
            <div>
                <h2>Is it used?</h2>
                <FileList selectFile={file => this.setState({file, export: null})} />
                <QueryRenderer
                    environment={environment}
                    query={
                        this.state.file
                            ? graphql`
                                  query appFileQuery($path: String!) {
                                      file(path: $path) {
                                          path
                                          absolutePath
                                          exports {
                                              __typename
                                              ... on DefaultExport {
                                                  defaultExportName: name
                                              }
                                              ... on NamedExport {
                                                  namedExportName: name
                                              }
                                          }
                                      }
                                  }
                              `
                            : null
                    }
                    variables={{path: this.state.file}}
                    render={({props, error}) => {
                        if (!props || !props.file) return null;

                        const {file} = props;
                        return (
                            <div>
                                <h2>{file.path}</h2>
                                Exports:
                                {file.exports.length > 0 ? (
                                    <ul>
                                        {file.exports.map(
                                            (fileExport, index) =>
                                                fileExport.__typename === 'DefaultExport' ? (
                                                    <li
                                                        key={index}
                                                        onClick={() =>
                                                            this.setState({export: 'default'})
                                                        }
                                                    >
                                                        Default Export:{' '}
                                                        {fileExport.defaultExportName ||
                                                            'Could not infer export name'}
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={index}
                                                        onClick={() =>
                                                            this.setState({
                                                                export: fileExport.namedExportNam,
                                                            })
                                                        }
                                                    >
                                                        Named export: {fileExport.namedExportName}
                                                    </li>
                                                )
                                        )}
                                    </ul>
                                ) : (
                                    <div>Pas d'exports</div>
                                )}
                                {this.state.export && (
                                    <Callsites
                                        path={this.state.file}
                                        exportName={this.state.export}
                                    />
                                )}
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default App;
