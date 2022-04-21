import React, { useState, useContext } from "react"
import { UserContext } from '../context/UserProvider.js'
import AuthForm from "./AuthForm.js"

const initInputs = { username: "", password: "" }

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }
    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }
    return (
        <div className="auth-container">
            <h1 className="text-logo">Voting app</h1>
            {!toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnTxt="Sign Up"
                        errMsg={errMsg}
                    />
                    <p className="switch-login" onClick={() => setToggle(prev => !prev)}>Already a member?</p>
                </>
                :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnTxt="Login"
                        errMsg={errMsg}
                    />
                    <p className="switch-login" onClick={() => setToggle(prev => !prev)}>Not a member?</p>
                </>
            }

        </div>

    )
}