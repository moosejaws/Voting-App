import React, { useEffect, useContext } from 'react'
import UserIssue from './UserIssue.js'
import { UserContext } from "../context/UserProvider.js"



export default function ProfileList(props) {
    
    const { issues } = props
    const { getUserIssues } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
    }, [])


    return (
        <div className="issue-list">
            {issues.map(issue => <UserIssue {...issue} userId={issue.user} key={issue._id} />)}
        </div>
    )
}