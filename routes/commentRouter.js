const express = require('express')
const commentRouter = express.Router()
const Comment = require("../models/Comment.js")

commentRouter.get("/:issueId", (req, res, next) => {
    Comment.find(
        { issueId: req.params.issueId },
        (err, comments) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            
            res.status(200).send(comments)
        }
    )
})

commentRouter.post("/:issueId", (req, res, next) => {
    console.log("panda", req.body)
    req.body.user = req.user._id
    req.body.username = req.user.username
    req.body.issueId = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, comment) => {
        if (err) {
        res.status(500)
        return next(err)
        }
        return res.status(201).send(comment)
    })
})

commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findByIdAndDelete({
        _id: req.params.commentId,
        user: req.user._id},
        (err, deletedComment) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(deletedComment)
        })
})



module.exports = commentRouter