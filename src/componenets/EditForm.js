import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactFilestack from 'filestack-react'
import { Modal, Form, Button } from 'semantic-ui-react'
import { editItem } from '../actions'

const EditForm = (props) => {
    const [imageUrl, changeImageUrl] = useState(props.itemInfo.image)
    const [itemInfo, changeItemInfo] = useState(props.itemInfo)
    const [modalState, changeModalState] = useState(false)
    const state = useSelector(state => state.login)
    const userId = state.currentUser.id
    const dispatch = useDispatch()

    const editFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const itemBody = {
            name: form.name.value,
            image: imageUrl,
            category: form.category.value,
            user_id: userId
        }
        fetch(`${state.url}/items/${props.itemInfo.id}`,{
            method: "PATCH",
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemBody)
        })
        .then(resp => resp.json())
        .then(editItemResponse => {
            dispatch(editItem(editItemResponse))
            changeModalState(false)

        })
    }

    const handleFormChange = (e) => {
        changeItemInfo({...state, [e.target.name]: e.target.value})
    }

    return (
        <Modal trigger={<Button onClick={() => changeModalState(true)} positive>Edit</Button>} open={modalState}  >
            <Modal.Header>Edit Item</Modal.Header>
            <Modal.Content>
                <Form onSubmit={editFormSubmit}>
                    <Form.Field>
                        <label>Item Name</label>
                        <input type='text' name='name' placeholder='Item Name' value={itemInfo.name} onChange={handleFormChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <input type='text' name='category' placeholder='Category' value={itemInfo.category} onChange={handleFormChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Change your Image</label>
                        <ReactFilestack apikey={process.env.REACT_APP_FILESTACK_KEY} onSuccess={(res) => changeImageUrl(res.filesUploaded[0].url)} />
                    </Form.Field>
                    <Button positive type='submit'>Submit Changes</Button>
                    <Button negative onClick={() => changeModalState(false)} >Never Mind...</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditForm
