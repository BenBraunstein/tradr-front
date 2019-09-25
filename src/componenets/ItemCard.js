import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import { toggleProposingTrade, itemToTrade ,newPendingTrade } from '../actions'

const ItemCard = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.login)

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
            fetch('http://localhost:3001/trades', {
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
                    alert(`Request Submitted, we will alert ${state.allUsers.find(user => user.id === tradeResponse.acceptor_id).username}`)
                }
                dispatch(newPendingTrade(tradeResponse))
                dispatch(toggleProposingTrade())
            })
        }
    }

    return (
        <Card>
            <Image src={props.itemInfo.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.itemInfo.name}</Card.Header>
                {props.owner ? <Card.Description>Owned By: {props.owner.username}</Card.Description> : null}
            </Card.Content>
            {props.buttonText ? (<Card.Content extra>
                <Button basic color='blue' onClick={(e) => itemButtonPressed(e, props.itemInfo)} >{props.buttonText}</Button>
            </Card.Content>) : null}
            
        </Card>

    )
}

export default ItemCard