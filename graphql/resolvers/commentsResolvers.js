const { UserInputError } = require('apollo-server')
const Post = require('../../models/PostSchema')
const checkAuth = require('../../utils/check-auth')

module.exports ={
    Mutation:{
        createComment: async(_, {postId, body }, context)=>{
            const {username} = checkAuth(context)
            if(body.trim() === ''){
                throw new UserInputError('Comment cannot be empty', { 
                    errors:{body: 'Comment cannot be empty'}})
            }
            const post = await Post.findById(postId)
            if(post){
                post.comments.unshift({
                    body, 
                    username, 
                    createdAt: new Date().toISOString
                })
                await post.save()
                return post
            }else throw new UserInputError('Post not found')
        },
        async deleteComment(_, {postId, commentId}, context){
            const {username} = checkAuth(context)
            const post = await Post.findById(postId)
            if(post){
                 const commentIndex = post.comments.findIndex( c => c.id === commentId)
            }

        } 

    }

}
