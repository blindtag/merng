const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const User = require('../../models/UserModel')
const {JWT_SECRET, JWT_EXPIRE} = require('../../config')
const {validateRegisterInput} = require('../../utils/validators')

module.exports={
    Mutation:{
        //register mutation
        async register(_, {registerInput: {username, email, password, confirmPassword}}, context, info){
            //Validate user
            const{valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }
           
            //Unique user
            const user = await User.findOne({username})
            if(user){
                throw new UserInputError('Username is taken', {errors: {username:'This username is taken'}
                 } )
            }

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