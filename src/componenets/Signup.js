import React from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../actions'

const Signup = () => {
    const dispatch = useDispatch()

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const signUpInfo = {
            username: form.username.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value
        }
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpInfo)
        })
            .then(resp => resp.json())
            .then(signupResponse => {
                console.log(signupResponse)
                dispatch(signup(signupResponse))
            })
    }


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="email" name="email" placeholder="Email" />
                <input type="text" name="phone" placeholder="Phone" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default Signup