import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import fetch from 'isomorphic-unfetch';

function fetchQuery(operation, variables) {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    })
        .then(response => response.json())
        .then(json => {
            if (json.error || (json.errors && json.errors.length > 0)) {
                return Promise.reject(json);
            }
            return json;
        });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
