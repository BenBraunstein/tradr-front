import React from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../actions'
import { Form, Modal, Menu, Button } from 'semantic-ui-react'

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
        <Modal dimmer='blurring' size='tiny' trigger={<Menu.Item name='Sign Up' />}>
            <Modal.Header>Sign Up</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSignupSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" />
                    </Form.Field>
                    <Form.Field>
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="Phone" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </Form.Field>
                    <Button type='submit'>Sign Up</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default Signup