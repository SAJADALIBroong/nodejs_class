const JWT_SECRET = require("../helpers/secret")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const AuthMiddleware = (req,res,next)=>{
    const token = req.headers["authorization"].split(" ")[1]
    try {
        const payload = jwt.verify(token, JWT_SECRET)

        const user = userModel.findById(payload.id)


        if(payload){
            req.user = user
        }else{
           return res.status(401).send({
            message:"unauthorized"
           })
        }
        next()
    } catch (error) {
        return res.status(401).send({
            message:"unauthorized"
           })
    }
    



}

module.exports = AuthMiddleware