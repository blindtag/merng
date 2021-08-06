const {AuthenticationError} = require('apollo-server')
const Post = require('../../models/PostSchema')
const checkAuth = require('../../utils/check-auth')

module.exports = {
    Query: {
    
    async getPosts(){
       try {
           //Get all posts from db
           const posts = await Post.find({})
           return posts
       } catch (err) {
           throw new Error(err)
       }
   },

   async getPost(_,{postId}){
       try {
           //Get post by id in db
           const post = await Post.findById({postId})
           if(post){
               return post
           }else{
               //If !post
               throw new Error('Post not found')
           }
       } catch (err) {
           throw new Error(err)
       }
   },
   
},
Mutation:{
    async createPost(_, {body}, context ){
        //Confirm user from token
        const user = checkAuth(context);
         console.log(user)
         
        const newPost = new Post({
            body,
            user:user.id,
           username:user.username,
           createdAt: new Date().toISOString()
        })

        //Save post in db
        const post = await newPost.save()
        context.pubsub.publish('NEW_POST', {
            newPost: post
        })
         return post
},
    async deletePost(_, {postId}, context){
           //Confirm user from token
           const user = checkAuth(context)
           try {
               const post = await Post.findById(postId)
            //Check if user owns post
               if(user.username === post.username){
                 await  post.delete() 
                 return 'Post deleted successfully'
               }else{
            //Throw error if user doesn't own post
                   throw new AuthenticationError('Action not allowed')
               }
           } catch (err) {
               throw new Error(err)
           }
    },
    async likePost(_, {postId}, context){
        const {username} = checkAuth(context)
        const post = await Post.findById(postId)
        if(post){
            //Check if post has been liked by thesame user
            if(post.likes.find(like => like.username === username)){
                post.likes = post.likes.filter(like  => like.username !== username)
            }else{
            //Like and save to db
                post.likes.push({
                    username, 
                    createdAt: new Date().toISOString()
                })
            }
            await post.save()
            return post
        }else throw new UserInputError('Post not found')
    },
},
Subscription:{
    newPost:{
        subscribe: (_, __, {pubsub})=> pubsub.asyncIterator('NEW_POST')
    }
}

}
