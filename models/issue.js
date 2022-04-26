const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
	//votes

    upVotes: {
        type: Number
    },
    downVotes: {
        type: Number
    },
    upVoted: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downVoted: [{type: Schema.Types.ObjectId,
        ref: "User"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Issue", issueSchema)