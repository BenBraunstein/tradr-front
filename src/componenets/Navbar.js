import React, {useState} from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import NotificationContainer from '../containers/NotificationContainer'
import LogIn from './LogIn'
import Signup from './Signup'
import { logout, updateHistory } from '../actions'

const Navbar = (props) => {
    const [activeItem, changeActiveItem] = useState('')
    const state = useSelector(state => state.login)
    const dispatch = useDispatch()

    const handleItemClick = (name) => changeActiveItem(name)

    const handleLogout = () => {
        console.log('Logging out...')
        localStorage.removeItem('token')
        dispatch(logout())
    }

    const handleHomeClick = (name) => {
        handleItemClick(name)
        // Send them Home
        dispatch(updateHistory('/'))
    }

    const handleYourItemClick = (name) => {
        handleItemClick(name)
        // Send them Home
        dispatch(updateHistory('/yourItems'))
    }

    return (
        <Menu style={{height: '49px'}}>
            <Menu.Item
                name='home'
                active={activeItem === 'Home'}
                onClick={(e) => handleHomeClick(e.target.innerText)}
            />
            <Menu.Item
                name='your items'
                active={activeItem === 'Your Items'}
                onClick={(e) => handleYourItemClick(e.target.innerText)}
            />
            <Menu.Item
                name='friends'
                active={activeItem === 'Friends'}
                onClick={handleItemClick}
            />
            {state.currentUser.username ? <NotificationContainer /> : null}
            {state.currentUser.username ? (<Menu.Menu position='right'><Menu.Item name={`Logout ${state.currentUser.username}`} onClick={handleLogout} /></Menu.Menu>) : (<Menu.Menu position='right'><LogIn /><Signup /></Menu.Menu>)}
        </Menu>
    )
    

}

export default Navbar