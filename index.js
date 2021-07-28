const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const colors = require('colors')

//Relative
const {MONGODB} = require('./config')
const Post = require('./models/PostSchema')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Mongodb Connected`.green.underline)
    return server.listen({port:5000})
})
.then(res=>{
    console.log(`Server running at ${res.url}`.yellow.underline)
})