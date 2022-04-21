import React, {useContext} from 'react'
import PublicList from './PublicList.js'
import IssueForm from './IssueForm.js'
import { UserContext } from "../context/UserProvider.js"

export default function Public() {


    const {
        user: { username },
        issues,
        addUserIssue
    } = useContext(UserContext)


    return (
        <div className="public">
            <h1>Welcome @{username}</h1>
            <h2 className="center">Post Issue</h2>
            <IssueForm addUserIssue={addUserIssue} />
            <div className="publicIssues">
                <h2 className="feed-header">All Issues</h2>
                <PublicList issues={issues} />
            </div>
        </div>
    )
}