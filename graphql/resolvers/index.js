const postsResolvers = require('./postResolvers')
const usersResolvers = require('./usersResolvers')
const commentsResolvers = require('./commentsResolvers')

module.exports={
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation

    }
}