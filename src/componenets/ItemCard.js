import React from 'react'

const ItemCard = (props) => {

    return (
        <div className='itemCard'>
            <h4>{props.itemInfo.name}</h4>
            <img style={{width: '250px'}} src={props.itemInfo.image}/>
            <h4>Current Owner: {props.owner.username}</h4>
        </div>
    )
}

export default ItemCard