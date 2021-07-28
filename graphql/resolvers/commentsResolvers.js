const { UserInputError } = require('apollo-server')
const post = require('../../models/PostSchema')
const checkAuth = require('../../utils/check-auth')

module.exports ={
    Mutation:{
        createComment: async(_, {posdtId, body}, context)=>{
            const {username} = checkAuth(context)
            if(body.trim() === ''){
                throw new UserInputError('Comment cannot be empty', { 
                    errors:{body: 'Comment cannot be empty'}})
            }
            const post = await Post.findById(postId)
            if(post){
                post.comments.unhift({
                    body, 
                    username, 
                    createdAt: new Date().toISOString
                })
                await post.save()
                return post
            }else throw new UserInputError('Post not found')
        }
    }
}