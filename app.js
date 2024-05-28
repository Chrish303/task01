const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers');



const app = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: {
        maxFileSize: 10 * 1024 * 1024, // 10 MB
      },
});



app.listen().then(() => {
    console.log('🚀...server runing at 4000...........🔥')
})