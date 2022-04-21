import React, { useEffect, useContext } from 'react'
import Issue from './Issue.js'
import { UserContext } from "../context/UserProvider.js"



export default function PublicList(props) {
    
    const { issues } = props
    const {  getAllUserIssues } = useContext(UserContext)

    useEffect(() => {
        getAllUserIssues()
    }, [])


    return (
        <div className="issue-list">
            {issues.map(issue => <Issue {...issue} key={issue._id} />)}
        </div>
    )
}