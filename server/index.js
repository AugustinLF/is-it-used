const {ApolloServer} = require('apollo-server');

const {schema} = require('./schema');

const apolloServer = new ApolloServer({
    schema,
    formatError: error => {
        console.error(error);
        throw error;
    },
});
apolloServer.listen(3001).then(({url}) => {
    console.log(`GraphQL server listening on ${url}`);
});
