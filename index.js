//Import dependencies
const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const colors = require('colors')
const {PubSub} = require('graphql-subscriptions')

//Relative
const {MONGODB} = require('./config')
const Post = require('./models/PostSchema')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

//Init deps
const pubsub =new PubSub();

//Init apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req, pubsub})
})

//Connect to db
mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Mongodb Connected`.green.underline)
    return server.listen({port:5000})
})
.then(res=>{
    console.log(`Server running at ${res.url}`.yellow.underline)
})