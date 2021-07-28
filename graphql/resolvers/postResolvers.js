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

        //Svae post in db
        const post = await newPost.save()
         return post
},
    async deletePost(_, {postId}, context){
        console.log(postId)
           //Confirm user from token
           const user = checkAuth(context)
           try {
               const post = await Post.findById(postId)

               if(user.username === post.username){
                 await  post.delete() 
                 return 'Post deleted successfully'
               }else{
                   throw new AuthenticationError('Action not allowed')
               }
           } catch (err) {
               throw new Error(err)
           }
    }

}


}