import React from 'react'
import {useSelector} from 'react-redux'
import ItemCard from '../componenets/ItemCard'
import {CardGroup} from 'semantic-ui-react'
import NoUser from '../componenets/NoUser'


const ItemContainer = (props) => {
    const state = useSelector(state => state.login)
    if(!state.currentUser.username){
        return <NoUser />
    }

    const searchItems = props.allItems.filter(item => item.name.toLowerCase().includes(state.searchText) || item.category.toLowerCase().includes(state.searchText))
    const allItemCards = searchItems.map(item => <ItemCard key={`item-${item.id}`} itemInfo={item} owner={state.allUsers.find(user => user.id === item.user_id)} buttonText={props.buttonText} yourItems={props.yourItems} />)

    if (searchItems.length < 1 && state.history.location.pathname === '/yourItems'){
        return <center style={{marginTop: '60px'}}>
            <h2>No items match your search term or you have no items</h2>
            <img src='../navbar-logo.png' alt='logo' />
        </center>
    }
    else if (searchItems.length < 1){
        return <center style={{marginTop: '60px'}}>
            <h2>No items match your search term</h2>
            <img src='../navbar-logo.png' alt='logo' />
        </center>
    }

    return (
            <CardGroup centered style={{marginTop: '50px'}} >
                {allItemCards}
            </CardGroup>
    )
}

export default ItemContainer