import React from 'react'
import {useSelector} from 'react-redux'
import Notification from '../componenets/Notification'
import { Modal, Button, CardGroup, Menu, Icon } from 'semantic-ui-react'

const NotificationContainer = () => {
    const state = useSelector(state => state.login)
    const userId = state.currentUser.id

    const allNotifications = state.pendingTrades.filter(notification => notification.requester_id === userId || notification.acceptor_id === userId)
    const allNotificationCards = allNotifications.map(notification => <Notification key={`notification-${notification.id}`} notificationInfo={notification}/>)

    if(allNotifications.length < 1){
        return (
            <Modal trigger={<Menu.Item name='bell'>
                {state.pendingTrades.length >= 1 ? <Icon name='bell outline' size='large' /> : <Icon name='bell slash outline' size='large' />}
            </Menu.Item>} basic style={{ top: '10em' }} >
                <Modal.Header>No Notifications</Modal.Header>
            </Modal>
        )
    }

    return (
        <Modal dimmer='blurring' trigger={<Menu.Item name='bell'>
            {state.pendingTrades.length}
            {state.pendingTrades.length >= 1 ? <Icon name='bell outline' size='large' /> : <Icon name='bell slash outline' size='large' />}
        </Menu.Item>} basic style={{ top: '10em' }} >
            <Modal.Header>Your Notifications</Modal.Header>
            <Modal.Description>
                <CardGroup centered>
                    {allNotificationCards}
                </CardGroup>
            </Modal.Description>
        </Modal>
    )
}

export default NotificationContainer