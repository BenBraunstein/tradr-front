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
    return (
            <CardGroup centered style={{marginTop: '50px'}} >
                {allItemCards}
            </CardGroup>
    )
}

export default ItemContainer