import React from 'react'
import {useDispatch} from 'react-redux'
import {login} from '../actions'
import { Modal, Menu, Form, Button } from 'semantic-ui-react'

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
        <Modal dimmer='blurring' size='tiny' trigger={<Menu.Item name='Login'/>}>
            <Modal.Header>Log In</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </Form.Field>
                    <Button type='submit'>Log In</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default LogIn
