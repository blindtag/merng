const {AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

module.exports =(context)=>{
    const authHeader = context.req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            try {     
                jwt.verify(token , JWT_SECRET)
                return user
            } catch (err) {
                throw new AuthenticationError('Invalid or Expired token')
            }
        }
        throw new Error("Authentication token must be 'Bearer' Token")
    }
    throw new Error("Authorization header must be provided")

}