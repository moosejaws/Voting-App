import React, { useState, useEffect } from "react"
import axios from "axios"
const UserContext = React.createContext()
const userAxios = axios.create()


function UserProvider(props) {

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })


    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        issues: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }


    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserIssues()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }
    function handleAuthError(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    // get all of the issues of all of the users
    function getAllUserIssues() {
        userAxios.get(`/api/issue`)
            .then(res => {
                setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    //get only x users issues
    function getUserIssues(userId) {
        userAxios.get(`/api/issue/user/${userId}`)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    //add issue 
    function addUserIssue(newIssue) {
        userAxios.post(`/api/issue`, newIssue)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
                .catch(err => console.log(err)
            )
            return getUserIssues()
    }

    function editUserIssue(newIssue, issueId) {
        userAxios.put(`/api/issue/${issueId}`, newIssue)
            .then(res => setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.map(issue => issue._id !== issueId ? issue : res.data)
            })))
    }

    function deleteUserIssue(issueId) {
        userAxios.delete(`/api/issue/${issueId}`)
            .then(res => setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.filter(issue => issue._id !== issueId)
            })))
                .catch(err => console.log(err)
            )
        return getUserIssues()
    }



    useEffect(() => {
        getUserIssues()
        getAllUserIssues()
    }, [])

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                getAllUserIssues,
                getUserIssues,
                addUserIssue,
                editUserIssue,
                deleteUserIssue
            }}>

            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }