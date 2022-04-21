import React, {useContext, useEffect} from 'react'
import IssueForm from './IssueForm.js'
import ProfileList from './ProfileList.js'
import { UserContext } from "../context/UserProvider.js"


export default function Profile() {

    const {
        user: { username },
        getUserIssues,
        addUserIssue,
        issues
    } = useContext(UserContext)


    useEffect(() => {
        getUserIssues()
    }, [])


    return (
        <div className="profile">
            <h1>Welcome @{username}</h1>
            <h2 className="center">Post Issue</h2>
            <IssueForm addUserIssue={addUserIssue} />
            <div className="userIssues">
                <h2 className="feed-header">Your Posts</h2>
                <ProfileList issues={issues} />
            </div>
        </div>
    )
}