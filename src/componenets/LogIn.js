import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {login, fetchTrades} from '../actions'
import { Modal, Menu, Form, Button, Message } from 'semantic-ui-react'

const LogIn = () => {
    const state = useSelector(state => state.login)
    const dispatch = useDispatch()
    const [error, toggleError] = useState(false)

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        toggleError(false)
        const form = e.target
        const logInInfo = {
            username: form.username.value,
            password: form.password.value
        }
        fetch(`${state.url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logInInfo)
        })
            .then(resp => resp.json())
            .then(loginResponse => {
                if(loginResponse.errors){
                    toggleError(true)
                }
                else{
                    dispatch(login(loginResponse))
                    dispatch(fetchTrades(loginResponse.users_pending_trades))
                }
            })
    }
    
    return (
        <Modal dimmer='blurring' size='tiny' trigger={<Menu.Item name='Login'/>}>
            <Modal.Header>Log In</Modal.Header>
            <Modal.Content>
                <Form error={error} onSubmit={handleLoginSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </Form.Field>
                    <Button type='submit'>Log In</Button>
                    <Message error header="Whoa... Hold Up Bud!" content={`Looks like you've got the wrong username, password combination`} />
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default LogIn
