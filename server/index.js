const {ApolloServer, gql} = require('apollo-server');

const {typeDefs, resolvers} = require('./graphql');

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
        console.log(error);
        throw error;
    },
});
apolloServer.listen(3001).then(({url}) => {
    console.log(`GraphQL server listening on ${url}`);
});
