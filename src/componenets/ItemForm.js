import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import ReactFilestack from 'filestack-react'

const ItemForm = (props) => {
    const [imageUrl, changeImageUrl] = useState("")
    const userId = useSelector(state => state.login.currentUser.id)

    const itemFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const itemBody = {
            name: form.name.value,
            image: imageUrl,
            category: form.category.value,
            user_id: userId
        }
        fetch('http://localhost:3001/items',{
            method: "POST",
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemBody)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    return (
        <div>
            <h3>Add a new item</h3>
            <form onSubmit={itemFormSubmit}>
                <input type='text' name='name' placeholder='Item Name'/>
                <input type='text' name='category' placeholder='Category'/>
                <ReactFilestack apikey={process.env.REACT_APP_FILESTACK_KEY} onSuccess={(res) => changeImageUrl(res.filesUploaded[0].url) }/>
                <input type='submit' value='Add Item' />
            </form>
        </div>
    )
}

export default ItemForm