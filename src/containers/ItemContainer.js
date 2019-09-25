import React from 'react'
import {useSelector} from 'react-redux'
import ItemCard from '../componenets/ItemCard'
import {CardGroup} from 'semantic-ui-react'


const ItemContainer = (props) => {
    const state = useSelector(state => state.login)
    const allItemCards = props.allItems.map(item => <ItemCard key={`item-${item.id}`} itemInfo={item} owner={state.allUsers.find(user => user.id === item.user_id)} buttonText={props.buttonText} />)
    return (
            <CardGroup centered>
                {allItemCards}
            </CardGroup>
    )
}

export default ItemContainer