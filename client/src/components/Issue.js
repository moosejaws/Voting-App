import React, { useState, useEffect } from "react"
import axios from "axios"
import CommentForm from "./CommentForm.js"

import Comment from "./Comment.js"
// import CommentList from "./CommentList.js"
//import { UserContext } from "../context/UserProvider.js"
// import { CommentContext } from "../context/CommentProvider.js"
// import EditIssueForm from "./EditIssueForm.js"

export default function Issue(props) {

  const userAxios = axios.create()

  userAxios.interceptors.request.use(config => {
      const token = localStorage.getItem("token")
      config.headers.Authorization = `Bearer ${token}`
      return config
  })

  const { title, description, imgUrl, username , _id, issueId, upVotes, downVotes} = props

  const [userComments, setUserComments] = useState([])
  const [userComment, setUserComment] = useState("")

  const [votes, setVotes] = useState({ upVotes: upVotes || 1, downVotes: downVotes || 0 })


  function upVote(issueId) {
    userAxios.put(`api/issue/upvotes/${issueId}`)
        .then(res => setVotes(prevVotes => ({ 
          ...prevVotes, 
          upVotes: res.data.upVotes || prevVotes.upVotes })))
        .catch(err => console.log(err.response.data.errMsg))
}

function downVote(issueId) {
    userAxios.put(`api/issue/downvotes/${issueId}`)
        .then(res => setVotes(prevVotes => ({ ...prevVotes, downVotes: res.data.downVotes || prevVotes.downVotes })))
        .catch(err => console.log(err.response.data.errMsg))
}


function getAllComments() {
  userAxios.get(`/api/comment/${_id}`)
  .then(res => {
      setUserComments(res.data)
      console.log(res.data)
  }
  )
  .catch(err => console.log(err))
}


function submitComment(newComment) {
  userAxios.post(`/api/comment/${_id}`, newComment)
      .then(res => {
          setUserComments(prevState => [...prevState, res.data])
      })
      .catch(err => console.log(err))
  setUserComment("")
  getAllComments()
}

function deleteComment(commentId) {
  userAxios.delete(`/api/comment/${commentId}`)
      .then(res => setUserComments(prevState => prevState.filter(comment => comment._id !== commentId)))
      .catch(err => console.log(err))
      getAllComments()
}


useEffect(() => {
  getAllComments()
}, [])




  return (
    <div className="issue">
      
          
            <h2>{ title }</h2>
            <h5 className="by">Posted by: @{ username }</h5> 
            <h4 className="description">{ description }</h4>
            <img src={imgUrl} alt={imgUrl} />

            <div className="features">
                <ul>

                <div className="votes">

                <li>{votes.upVotes}</li>
                <li><svg  onClick={() => upVote(_id)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16"
                >
                  

                
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                </svg></li>

              

                <li>
                <svg  onClick={() => downVote(_id)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-down-square-fill" viewBox="0 0 16 16"
                >

                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
                </svg>  </li>
                <li>{votes.downVotes}</li>
                </div>





                </ul>

                <div>
                  <CommentForm submitComment={submitComment} issueId={issueId}/>

                </div>


            </div>
            <h6>Comments</h6>

            <div id="comments">

            {userComments.map(comment => <Comment key={comment._id} {...comment} deleteComment={deleteComment} />)}

            </div>
          
      
    </div>
  )
}

