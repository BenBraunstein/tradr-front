import React from 'react'
import {useDispatch} from 'react-redux'
import {login} from '../actions'

const LogIn = () => {
    const dispatch = useDispatch()

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const logInInfo = {
            username: form.username.value,
            password: form.password.value
        }
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logInInfo)
        })
            .then(resp => resp.json())
            .then(loginResponse => {
                console.log(loginResponse)
                dispatch(login(loginResponse))
            })
    }

    
    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleLoginSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Log In" />
            </form>
        </div>
    )
}

export default LogIn