import React from 'react'
import {useSelector} from 'react-redux'
import ItemCard from '../componenets/ItemCard'

const ItemContainer = () => {
    const state = useSelector(state => state.login)
    console.log(state)
    const allItemCards = state.allItems.map(item => <ItemCard key={`item-${item.id}`} itemInfo={item} owner={state.allUsers.find(user => user.id === item.user_id)}/>)
    return (
        <>
            <h3>All Items</h3>
            {allItemCards}
        </>
    )
}

export default ItemContainer