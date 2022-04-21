const express = require('express')
const userRouter = express.Router()
const User = require('../models/User.js')

//Get All User
userRouter.get("/", (req, res, next) => {
    User.find(
        {},
        (err, users) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
    
})

module.exports = userRouter