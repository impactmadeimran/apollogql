const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Category } = require("./Resolvers/Category")
const { Product } = require("./Resolvers/Product")
const { Query } = require("./Resolvers/Query");
const { Mutation } = require("./Resolvers/Mutation");
const { db} = require("./db");

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Category,
        Product,
        Query,
        Mutation
    },
    context:{
        db
    }
});

server.listen().then(({ url }) => {
    console.log("Server now listening on " + url)
})