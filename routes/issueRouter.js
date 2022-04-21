const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/Issue.js')

// Get All Issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

issueRouter.get('/user/:userId', (req, res, next) => {
  Issue.find({ user: req.user._id }, (err, issues) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

//get issue by the id
issueRouter.get('/:issueId', (req, res, next) => {
  Issue.findById(req.params.issueId, (err, issue) => {
    if (err) {
      res.status(500)
      return next(err)
    } else if (!issue) {
      res.status(404)
      return next(new Error('No item has been found.'))
    }
    return res.send(issue)
  })
})

// Add new Issue
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  req.body.username = req.user.username

  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId },
    (err, deletedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted issue: ${deletedIssue}`)
    }
  )
})

// Update Issue 
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, 
      user: req.user._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )
})

issueRouter.put("/upvotes/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    { $inc: { upVotes: 1 } },
    { new: true },
    (err, issue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(issue)
    }
  )
})

issueRouter.put("/downvotes/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    { $inc: { downVotes: -1 } },
    { new: true },
    (err, issue) => {
      if (err) {
        res.status(500)
      }
      return res.status(200).send(issue)
    })
})




module.exports = issueRouter