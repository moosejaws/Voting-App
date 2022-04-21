import React, {useState, useContext} from "react"
import { UserContext } from "../context/UserProvider.js"

export default function IssueForm(props){

    const initInputs = {
        title:"",
        description:"",
        imgUrl:""
    }

    const [inputs, setInputs] = useState(initInputs)

    const { addUserIssue } = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addUserIssue(inputs)
        setInputs(initInputs)
    }

    const {title, description, imgUrl} = inputs

    return(
        <form className="post-issue" onSubmit={handleSubmit}>
            
            <div className="just-inputs">
                <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
                />
                <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
                className="description-input"
                />
                <input
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={handleChange}
                placeholder="Image" />
            </div>

            <button class="btn btn-outline-dark">Submit</button>

        </form>
    )
}