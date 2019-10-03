import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactFilestack from 'filestack-react'
import { Modal, Menu, Form, Button } from 'semantic-ui-react'
import alertify from 'alertifyjs'
import { newItem } from '../actions'

const ItemForm = () => {
    const [imageUrl, changeImageUrl] = useState("")
    const [modalState, changeModalState] = useState(false)
    const state = useSelector(state => state.login)
    const userId = state.currentUser.id
    const dispatch = useDispatch()

    const itemFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const itemBody = {
            name: form.name.value,
            image: imageUrl,
            category: form.category.value,
            user_id: userId
        }
        fetch(`${state.url}/items`,{
            method: "POST",
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemBody)
        })
        .then(resp => resp.json())
        .then(newItemResponse => {
            dispatch(newItem(newItemResponse))
            changeModalState(false)
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.success(`Thanks for adding your ${newItemResponse.name}`);
        })
    }

    return (
        <Modal trigger={<Menu.Item name="new item" onClick={() => changeModalState(true)} />} open={modalState} >
            <Modal.Header>Add a new Item</Modal.Header>
            <Modal.Content>
                <Form onSubmit={itemFormSubmit}>
                    <Form.Field>
                        <label>Item Name</label>
                        <input type='text' name='name' placeholder='Item Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <input type='text' name='category' placeholder='Category' />
                    </Form.Field>
                    <Form.Field>
                        <label>Upload your Image</label>
                        <ReactFilestack apikey={process.env.REACT_APP_FILESTACK_KEY} onSuccess={(res) => changeImageUrl(res.filesUploaded[0].url)} />
                    </Form.Field>
                    <Button positive type='submit'>Add Item</Button>
                    <Button negative onClick={() => changeModalState(false)} >Never Mind...</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default ItemForm
