import {ApolloClient} from 'apollo-boost';
import {HttpLink} from 'apollo-boost';
import {InMemoryCache} from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// @ts-ignore Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    // @ts-ignore
    global.fetch = fetch;
}

function create(initialState) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        // @ts-ignore
        connectToDevTools: process.browser,
        // @ts-ignore
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql', // Server URL (must be absolute)
            credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        }),
        cache: new InMemoryCache().restore(initialState || {}),
    });
}

export default function initApollo(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    // @ts-ignore
    if (!process.browser) {
        return create(initialState);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState);
    }

    return apolloClient;
}
