import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../actions'
import { Form, Modal, Menu, Button, Message } from 'semantic-ui-react'

const Signup = () => {
    const state = useSelector(state => state.login)
    const dispatch = useDispatch()
    const [error, toggleError] = useState(false)
    const [errorMessage, changeErrorMessage] = useState('')
    const [signUpInfoHook, changeSignUpInfoHook] = useState({username: '', email: '', phone: '', password: ''})

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        toggleError(false)
        const form = e.target
        const signUpInfo = {
            username: form.username.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value
        }
        fetch(`${state.url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpInfo)
        })
            .then(resp => resp.json())
            .then(signupResponse => {
                if(signupResponse.user.id !== null){
                    dispatch(signup(signupResponse))
                }
                else{
                    toggleError(true)
                }
            })
    }

    const handleFieldChange = (e) => {
        changeSignUpInfoHook({...signUpInfoHook, [e.target.name]: e.target.value})
    }
    
    const handleBlur = () => {
        toggleError(false)
        const usernameTaken = state.allUsers.find(user => user.username.toLowerCase() === signUpInfoHook.username.toLowerCase())
        const emailTaken = state.allUsers.find(user => user.email.toLowerCase() === signUpInfoHook.email.toLowerCase())
        const phoneTaken = state.allUsers.find(user => user.phone === signUpInfoHook.phone)
        if(usernameTaken !== undefined){
            changeErrorMessage("That username is already taken")
            toggleError(true)
        }
        else if(emailTaken !== undefined){
            changeErrorMessage("That email address is already taken")
            toggleError(true)
        }
        else if(phoneTaken !== undefined){
            changeErrorMessage("That phone number is already taken")
            toggleError(true)
        }
        else if(signUpInfoHook.password.length < 6){
            changeErrorMessage("Passwords must have more than 6 characters")
            toggleError(true)
        }
    }

    return (
        <Modal dimmer='blurring' size='tiny' trigger={<Menu.Item name='Sign Up' />}>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                <Form error={error} onSubmit={handleSignupSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" value={signUpInfoHook.username} onChange={handleFieldChange} onBlur={handleBlur} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={signUpInfoHook.email} onChange={handleFieldChange} onBlur={handleBlur} />
                    </Form.Field>
                    <Form.Field>
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="Phone" value={signUpInfoHook.phone} onChange={handleFieldChange} onBlur={handleBlur} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" value={signUpInfoHook.password} onChange={handleFieldChange} onBlur={handleBlur} />
                    </Form.Field>
                    <Button disabled={error} type='submit'>Sign Up</Button>
                    <Message error header='Whoa.... Hold Up Bud!' content={errorMessage} />
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default Signup