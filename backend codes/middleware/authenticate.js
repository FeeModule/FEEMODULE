const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Database/StudentSchema')



const Authenticate = async (req , res , next ) =>{
    try {
        const token = req.cookies.feemoduletoken;

        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);

        console.log(verifyToken)

        const userVerified = await User.findOne({_id:verifyToken._id , "tokens : token " : token})

        if (!userVerified) {
            throw new Error("User Not Found")
        }

        req.token = token ;
        req.userVerified  = userVerified;
        req.userId = userVerified._id;

        next();

    } catch (error) {
        res.status(401).send("Unauthorised")
    }
}


module.exports = Authenticate