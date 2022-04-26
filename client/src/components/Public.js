import React, {useContext} from 'react'
import PublicList from './PublicList.js'
import { UserContext } from "../context/UserProvider.js"

export default function Public() {


    const {
        user: { username },
        issues
    } = useContext(UserContext)


    return (
        <div className="public">
            <h1>Welcome @{username}</h1>
            <h2 className="center">Post Issue</h2>
            <div className="publicIssues">
                <h2 className="feed-header">All Issues</h2>
                <PublicList issues={issues} />
            </div>
        </div>
    )
}