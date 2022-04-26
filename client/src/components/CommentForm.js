import React, { useState } from 'react'
//import { CommentContext } from "../context/CommentProvider.js"

export default function CommentForm(props) {

    const initInputs = {
        comment: ""
    }

    const [inputs, setInputs] = useState(initInputs)

    const { _id, submitComment } = props

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        submitComment(inputs, _id)
        setInputs(initInputs)
    }

    const { comment } = inputs

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                
                    <textarea
                    class="form-control" id="exampleFormControlTextarea1" rows="2"
                        
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={handleChange}
                        placeholder="Type your comment here..."
                    />
                    <button  id="addcomment" className = "add-comment" class="btn btn-outline-dark">Add Comment</button>
                </div>
            
            </form>
        </div>
    )
}