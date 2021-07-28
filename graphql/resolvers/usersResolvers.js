const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const User = require('../../models/UserModel')
const {JWT_SECRET, JWT_EXPIRE} = require('../../config')
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')

function generateToken(user){
   return  jwt.sign({
        id : user.id,
        email : user.email,
        username : user.username
    }, JWT_SECRET, {expiresIn: JWT_EXPIRE})
}

module.exports={
    Mutation:{
        //login mutation 
        async login(_, {username, password}){

             //Validate user
             const{valid, errors} = validateLoginInput(username, password)
             if(!valid){
                 throw new UserInputError('Errors', {errors})
             }
            const user = await User.findOne({username})
            
            //If user doesnt exist
            if(!user){
                errors.general =  "User not found"
                throw new UserInputError('User not found', {errors})
            }
            //Compare passwords
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general =  "Invalid Credentials"
                throw new UserInputError('Invalid Credentials', {errors}) 
            }
            const token =generateToken(user)
            return{
                ...user._doc,
                id: user.id,
                token

            }

        },
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
            const token = generateToken(res)
 
            return{
                ...res._doc,
                id: res.id,
                token

            }

        }
    }
}