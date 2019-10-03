import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Launcher } from 'react-chat-window'
import { addMessage } from '../actions'

const Chat = () => {
    const state = useSelector(state => state.login)
    const dispatch = useDispatch()
    const messageList = state.messageList

    const onMessageWasSent = (message) => {
        let newMessage
        let messageToPost
        if(message.type === 'text'){
            newMessage = {
                author: state.currentUser.username,
                type: 'text',
                data: {
                    text: message.data.text
                }
            }
            messageToPost = {
                author: state.currentUser.username,
                kind: 'text',
                content: message.data.text
            }
        }
        else if(message.type === 'emoji') {
            newMessage = {
                author: state.currentUser.username,
                type: 'emoji',
                data: {
                    emoji: message.emoji
                }
            }
            messageToPost = {
                author: state.currentUser.username,
                kind: 'emoji',
                content: message.data.emoji
            }
        }
        dispatch(addMessage(newMessage))
        fetch(`${state.url}/messages`, {
            method: 'POST',
            headers: {
                accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageToPost)
        })
    }

    const controlledMessageList = messageList.map(message => {
        if(message.author === state.currentUser.username){
            return {...message, author: 'me'}
        }
        else{
            if(message.type === 'text'){
                return {...message, data: {text: `${message.author}:  ${message.data.text}`}}
            }
            else if(message.type === 'emoji'){
                return {...message, data: {emoji: message.data.emoji}}
            }
        }
        return {...message}
    })

    return (
        <>
            <audio autoPlay><source src="https://cdn.filestackcontent.com/FV4YqdQSgy6JDAIRxTiZ" type="audio.ogg"/></audio>
            <Launcher
                agentProfile={{
                    teamName: 'Tradr Chat',
                    imageUrl: 'https://i.imgur.com/dJKMcle.png'
                }}
                onMessageWasSent={onMessageWasSent.bind(this)}
                messageList={controlledMessageList}
                mute={false}
                showEmoji
            />
        </>
    )
}

export default Chat