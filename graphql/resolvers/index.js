const postsResolvers = require('./postResolvers')
const usersResolvers = require('./usersResolvers')

module.exports={
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}