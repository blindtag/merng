const User = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_EXPIRE} = require('../../config')

module.exports={
    Mutation:{
        //register mutation
        async register(parent, {registerInput: {username, email, password, confirmPassword}}, context, info){
            //Validate user
            //Unique user

            //Hash password
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                username, 
                email,
                password,
                createdAt: new Date().toISOString()
            })
            // Save to db
            const res = await  newUser.save()
  
            // Create hash token
            const token = jwt.sign({
                id : res.id,
                email : res.email,
                username : res.username
            }, JWT_SECRET, {expiresIn: JWT_EXPIRE})
 
            return{
                ...res._doc,
                id: res.id,
                token

            }

        }
    }
}