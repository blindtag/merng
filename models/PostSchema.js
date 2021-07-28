const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    body: {type:String},
    username: {type:String},
    createdAt: {type:String},
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
