import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Card, Image, Button } from 'semantic-ui-react'
import { declineTrade, acceptTrade } from '../actions'

const Notification = (props) => {
    const state = useSelector(state => state.login)
    const dispatch = useDispatch()
    const requesterItemInfo = state.allItems.find(item => item.id === props.notificationInfo.requester_item)
    const acceptorItemInfo = state.allItems.find(item => item.id === props.notificationInfo.acceptor_item)
    const requester = state.allUsers.find(user => user.id === props.notificationInfo.requester_id)
    const acceptor = state.allUsers.find(user => user.id === props.notificationInfo.acceptor_id)

    const handleAcceptPush = () => {
        fetch(`http://localhost:3001/accept/${props.notificationInfo.id}`, {
            method: "PATCH",
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: 'completed'})
        })
        .then(resp => resp.json())
        .then(acceptResponse => {
            // remove offer from notifications in state
            dispatch(acceptTrade(acceptResponse))
            console.log(acceptResponse)
        })
    }

    const handleDeclinePush = () => {
        fetch(`http://localhost:3001/decline/${props.notificationInfo.id}`, {
            method: "PATCH",
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: 'declined'})
        })
        .then(resp => resp.json())
        .then(declineResponse => {
            // remove it from notifications in state
            dispatch(declineTrade(declineResponse))
            console.log(declineResponse)
        })
    }

    const handleNudgePush = () => {
        fetch(`http://localhost:3001/nudge/${props.notificationInfo.id}`, {
            method: "PATCH",
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(nudgeResponse => {
                console.log(nudgeResponse)
                alert(`Ok... we will nudge ${acceptor.username}`)
            })
    }

    // Return for requester
    if(state.currentUser.id === requester.id){
        return (
            <Card style={{width: '350px', height: '220px', }}>
                <Card.Content>
                    <Image floated='left' size='tiny' src={requesterItemInfo.image} />
                    <Image floated='right' size='tiny' src={acceptorItemInfo.image} />
                    <Card.Header>{acceptor.username}</Card.Header>
                    <Card.Description>{`Still hasn't responded to your offer to trade your ${requesterItemInfo.name} for their ${acceptorItemInfo.name}`}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='green' onClick={handleNudgePush} >
                        Nudge ?
                    </Button>
                </Card.Content>
            </Card>
            )
    }

    // Return for acceptor
    return (
        <Card style={{ width: '350px', height: '200px', }}>
            <Card.Content>
                <Image floated='left' size='tiny' src={requesterItemInfo.image} />
                <Image floated='right' size='tiny' src={acceptorItemInfo.image} />
                <Card.Header>{requester.username}</Card.Header>
                <Card.Description>{`Is offering you their ${requesterItemInfo.name} for your ${acceptorItemInfo.name}`}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='green' onClick={handleAcceptPush}>
                    Hell ya
                </Button>
                <Button basic color='red' onClick={handleDeclinePush} >
                    Nah Bro
                </Button>
            </Card.Content>
        </Card>
    )
}

export default Notification