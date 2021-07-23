const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
const colors = require('colors')

//Relative
const {MONGODB} = require('./config')
const Post = require('./models/PostSchema')

const typeDefs = gql`
type Query{
    sayHi: String
}
`
const resolvers ={
    Query: {
        sayHi: ()=> 'Hello World!!!'
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
})
mongoose,connect(MONGODB, {useNewUrlParser: true})
.then(()=>{
    console.log(`Mongodb Connected`.bgGreen.underline)
    return server.listen({port:5000})
})
.then(res=>{
    console.log(`Server running at ${res.url}`)
})