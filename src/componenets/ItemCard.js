import React, {useState} from 'react'
import {Card, Button, Confirm} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import alertify from 'alertifyjs'
import { toggleProposingTrade, itemToTrade ,newPendingTrade, deleteItem } from '../actions'
import EditForm from './EditForm'

const ItemCard = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.login)
    const [deleteConfirm, toggleDeleteConfirm] = useState(false)

    const itemButtonPressed = (e, itemInfo) => {
        if(e.target.innerText === "Propose Trade"){
            dispatch(itemToTrade(itemInfo))
            dispatch(toggleProposingTrade())
        }
        else if (e.target.innerText === "Trade Away"){
            const tradeBody = {
                acceptor_item: state.itemToTrade.id,
                requester_item: itemInfo.id,
                status: "pending"
            }
            fetch(`${state.url}/trades`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tradeBody)
            })
            .then(resp => resp.json())
            .then(tradeResponse => {
                if(state.allUsers.length > 1){
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.success(`Request Submitted, we will alert ${state.allUsers.find(user => user.id === tradeResponse.acceptor_id).username} of your request`);
                }
                dispatch(newPendingTrade(tradeResponse))
                dispatch(toggleProposingTrade())
            })
        }
    }

    const pressedDelete = () => {
        fetch(`${state.url}/items/${props.itemInfo.id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(deletedItem => {
            dispatch(deleteItem(deletedItem))
            toggleDeleteConfirm(false)
        })
    }

    return (
        <Card>
            <div style={{width: '290px', height: '290px'}} >
                <img src={props.itemInfo.image} alt={props.itemInfo.name} style={{objectFit: 'cover', width: '290px', height: '290px', marginTop: '3px'}} />
            </div>
            <Card.Content>
                <Card.Header style={{ color: '#2185d0' }}>{props.itemInfo.name}</Card.Header>
                {props.owner ? <Card.Description style={{ color: '#2185d0' }}>Owned By: {props.owner === state.currentuser ? "You" : props.owner.username}</Card.Description> : null}
            </Card.Content>
            {props.yourItems ? (<Card.Content extra>
                <center>
                    <Button.Group>
                        <EditForm yourItems={props.yourItems} itemInfo={props.itemInfo} />
                        <Button.Or />
                        <Button onClick={() => toggleDeleteConfirm(true)} negative>Delete</Button>
                        <Confirm open={deleteConfirm} cancelButton="Never Mind" confirmButton={<Button negative>I'm Sure</Button>} onCancel={() => toggleDeleteConfirm(false)} onConfirm={pressedDelete} content={`Are you sure you want to delete your ${props.itemInfo.name}?  This cannot be undone...`}  />
                    </Button.Group>
                </center>
                </Card.Content>) : (
                props.buttonText ? (<Card.Content extra>
                    <Button basic color='blue' onClick={(e) => itemButtonPressed(e, props.itemInfo)} >{props.buttonText}</Button>
                </Card.Content>) : null
            )}
            
        </Card>

    )
}

export default ItemCard