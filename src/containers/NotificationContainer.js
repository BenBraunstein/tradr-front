import React from 'react'
import {useSelector} from 'react-redux'
import Notification from '../componenets/Notification'
import { Modal, CardGroup, Menu, Icon } from 'semantic-ui-react'

const NotificationContainer = () => {
    const state = useSelector(state => state.login)
    const userId = state.currentUser.id

    const allNotifications = state.pendingTrades.filter(notification => notification.requester_id === userId || notification.acceptor_id === userId)
    const allNotificationCards = allNotifications.map(notification => <Notification key={`notification-${notification.id}`} notificationInfo={notification}/>)

    return (
        <Modal dimmer='blurring' trigger={<Menu.Item name='bell'>
            {state.pendingTrades.length >= 1 ? <><Icon name='bell outline' size='large' />{state.pendingTrades.length}</> : <Icon name='bell slash outline' size='large' /> }
        </Menu.Item>} basic style={{ top: '10em' }} >
            {state.pendingTrades.length >= 1 ? <Modal.Header>Your Notifications</Modal.Header> : <Modal.Header>No Notifications</Modal.Header>}
            <Modal.Description>
                <CardGroup centered>
                    {allNotificationCards}
                </CardGroup>
            </Modal.Description>
        </Modal>
    )
}

export default NotificationContainer