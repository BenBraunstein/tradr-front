import React, {useState} from 'react'
import {Menu, Image, Input} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import NotificationContainer from '../containers/NotificationContainer'
import LogIn from './LogIn'
import Signup from './Signup'
import { logout, updateHistory, updateSearchText } from '../actions'
import ItemForm from './ItemForm'

const Navbar = (props) => {
    const [activeItem, changeActiveItem] = useState('')
    const state = useSelector(state => state.login)
    const dispatch = useDispatch()

    const handleItemClick = (name) => changeActiveItem(name)

    const handleLogout = () => {
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
        // Send them ot their items
        dispatch(updateHistory('/yourItems'))
    }

    const handleSearch = (e) => {
        dispatch(updateSearchText(e.target.value))
    }

    return (
        <Menu fixed='top' style={{ height: '49px'}}  >
            <Menu.Item 
                name='home'
                active={activeItem === 'Home'}
                content={<Image src='../navbar-logo.png' style={{ height: '49px' }} />}
                onClick={(e) => handleHomeClick(e.target.innerText)}
                />
            <Menu.Item
                name='your items'
                active={activeItem === 'Your Items'}
                onClick={(e) => handleYourItemClick(e.target.innerText)}
            />
            {state.currentUser.username ? <ItemForm /> : null}
            {state.currentUser.username ? <NotificationContainer /> : null}
            {state.currentUser.username ? (<Menu.Menu position='right'><Menu.Item><Input icon='search' placeholder='Search...' onChange={handleSearch} /></Menu.Item> <Menu.Item content={`Logout ${state.currentUser.username}`} onClick={handleLogout} /></Menu.Menu>) : (<Menu.Menu position='right'><LogIn /><Signup /></Menu.Menu>)}
        </Menu>
    )
    

}

export default Navbar