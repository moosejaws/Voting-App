import React, { useState, useContext } from "react"
import axios from "axios"
import { CommentContext } from "../context/CommentProvider.js"
import CommentForm from "./CommentForm.js"
// import Comment from "./Comment.js"

export default function Issue(props) {

  const userAxios = axios.create()

  userAxios.interceptors.request.use(config => {
      const token = localStorage.getItem("token")
      config.headers.Authorization = `Bearer ${token}`
      return config
  })

  const { title, description, imgUrl, username,  _id, upVotes, downVotes } = props
  const [commentToggle, setCommentToggle] = useState(false)
  // const { submitComment, deleteUserIssue, getAllComments} = useContext(CommentContext)
  const [votes, setVotes] = useState({ upVotes: upVotes || 0, downVotes: downVotes || 0 })
  const [voteErrMsg, setVoteErr] = useState("")

  userString, 

    useEffect(() => {
      getAllComments()
    }, [])
    

    /*function voteValidation(vote, _userId, id, username){
      const hasVoted = voted.includes(username)
      hasVoted ?
      console.log(`Error: you've already voted here`)
      :
      submitVote(vote, _userId, id)
  }
  /*


  function upVote(issueId) {
    userAxios.put(`api/issue/upvotes/${issueId}`)
        .then(res => setVotes(prevVotes => ({ ...prevVotes, upVotes: res.data.upVotes || prevVotes.upVotes })))
        .catch(err => setVoteErr(err.response.data.errMsg))
}

function downVote(issueId) {
    userAxios.put(`api/issue/downvotes/${issueId}`)
        .then(res => setVotes(prevVotes => ({ ...prevVotes, downVotes: res.data.downVotes || prevVotes.downVotes })))
        .catch(err => console.log(err.response.data.errMsg))
}

  return (
    <div className="issue">
      {
        !commentToggle ?
          <>
            <h2>{ title }</h2>
            <h5 className="by">Posted by: @{ username }</h5>
            <h4 className="description">{ description }</h4>
            <img src={imgUrl} alt={imgUrl} />

            <div className="features">

                <ul>
                <li><h6>UPVOTES: {votes.upVotes}</h6></li>

                <li><svg onClick={() => upVote(_id, username)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
              </svg></li>

                <li><h6>DOWNVOTES: {votes.downVotes}</h6></li>

                <li><svg onClick={() => downVote(_id, username)}  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
                </svg>  </li>
                <Text color='red.600'>{voteErrMsg}</Text>




                <li><svg onClick={() => setCommentToggle(prevState => !prevState)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg></li>


                </ul>

                <CommentList  />

            </div>
            <p>{voteErrMsg}</p>

          </>
          :
          <>
            <h2>{ title }</h2>
            <h5 className="by">Posted by: @{ username }</h5>
            <h4 className="description">{ description }</h4>
            <img src={imgUrl} alt={imgUrl} />
            <CommentForm {...props}  setCommentToggle={setCommentToggle} submitComment={submitComment} />

          <CommentList  getAllComments={getAllComments} />

            <button class="btn btn-danger" onClick={() => deleteUserIssue(_id)}>Delete</button>
            <button onClick={() => setCommentToggle(prevState => !prevState)}>Cancel</button>
          </>
      }
    </div>
  )
}

onClick={() => voteValidation("upvote", _userId, _id, user.username)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16"
                title={ userString === user.username ? 'cannot vote on your own content' : 'upvote' || voted.includes(user.username) ? `you've already voted` : `upvote` }

                onClick={() => voteValidation("downvote", _id, _userId, user.username)}  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-down-square-fill" viewBox="0 0 16 16"
                title={ userString === user.username ? 'cannot vote on your own content' : 'downvote' || voted.includes(user.username) ? `you've already voted` : `downvote` }
                >



  const { title, description, imgUrl, username , _id, _userId, votes, voted 