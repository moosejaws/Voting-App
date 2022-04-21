import React, { useState, useEffect } from "react"
import axios from "axios"

const CommentContext = React.createContext()
const userAxios = axios.create()



function CommentProvider(props) {

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })


    const [comment, setComments] = useState([])
    //const [issueComment, setIssueComment] = useState("")




    
   /* function getAllComments(_id) {
        userAxios.get(`/api/comment/`)
        .then(res => {
            setComments(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }*/

    
    function getAllComments(issueId) {
        userAxios.get( `/api/comment/${issueId}`)
            .then(res =>
            setComments( prevState => ( {
                ...prevState,
                ...res.data,
            } ) )
        )
    }

    useEffect(() => {
        
        getAllComments()
    }, [])


    function submitComment(issueId, newComment) {
        console.log("panda", issueId)
        userAxios
            .post(`/api/comment/${issueId}`, newComment)
            .then(res => {
                setComments(prevState =>  [
                    ...prevState,
                    res.data
                ])
            })
            .catch( err => console.log( err.response.data.errMsg ) )
            getAllComments()
    } 




    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => setComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
            getAllComments()
    }
    
    return (
        <CommentContext.Provider
            value={{
                comment,
                submitComment,
                getAllComments,
                deleteComment
            }}>

            {props.children}
        </CommentContext.Provider>
    )
}

export { CommentContext, CommentProvider }