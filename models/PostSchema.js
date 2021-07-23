const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    body:String,
    username: String,
    createdAt: String,
    comments:[
        {
            body: String,
            username: String,
            createdAt: String
        } 
    ],
        likes: [
            {
                username: String,
                createdAt: String
            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectID,
            refs: 'users'

        }
   

})

module.exports = User = mongoose.model('Post', PostSchema);
