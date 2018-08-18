import * as React from 'react';
import {QueryRenderer, graphql} from 'react-relay';

import environment from './relayEnvironment';

const Callsites = ({path, exportName}) => (
    <QueryRenderer
        environment={environment}
        variables={{path, exportName}}
        query={graphql`
            query callsitesQuery($path: String!, $exportName: String!) {
                file(path: $path) {
                    export(name: $exportName) {
                        callsites {
                            path
                        }
                    }
                }
            }
        `}
        render={({props, error}) => {
            if (!props || !props.file) return null;
            // TODO handle nullables
            const {
                file: {
                    export: {callsites},
                },
            } = props;

            // modify wording for default/named export

            return (
                <div>
                    {callsites.length > 0 ? (
                        <div>
                            {`The export ${exportName} of ${path} is used in:`}
                            <ul>
                                {callsites.map((callsite, index) => (
                                    <li key={index}>{callsite.path}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>{`The export ${exportName} of ${path} is not used`}</div>
                    )}
                </div>
            );
        }}
    />
);
export default Callsites;
