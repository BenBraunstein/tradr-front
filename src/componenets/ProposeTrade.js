import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Segment, Grid, CardGroup, Header } from 'semantic-ui-react'
import ItemCard from './ItemCard'

const ProposeTrade = () => {
    const state = useSelector(state => state.login)
    const wantItemCard = <ItemCard key={`item-${state.itemToTrade.id}`} itemInfo={state.itemToTrade} owner={state.allUsers.find(user => user.id === state.itemToTrade.user_id)} />
    const yourItemCards = state.allItems.filter(item => item.user_id === state.currentUser.id).map(item => <ItemCard key={`item-${item.id}`} itemInfo={item} owner={{username: 'You'}} buttonText={"Trade Away"} />)
    console.log(state.itemToTrade)

    return (
        <Segment>
            <Grid columns='equal' >
                <Grid.Column width={4}>
                    <Header as='h3' attached='top'>
                        You want
                    </Header>
                    <br/>
                    <CardGroup centered>
                        {wantItemCard}
                    </CardGroup>
                </Grid.Column>
                <Grid.Column>
                    <Header as='h3' attached='top'>
                        Pick an item you would like to trade
                    </Header>
                    <br/>
                    <CardGroup centered>
                        {yourItemCards}
                    </CardGroup>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default ProposeTrade