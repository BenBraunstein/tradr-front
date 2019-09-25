import React, {useEffect} from 'react';
import './App.css';
import LogIn from './componenets/LogIn'
import {useSelector, useDispatch} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import {autologin, fetchItems, fetchUsers, fetchTrades, grabHistory} from './actions'
import ItemContainer from './containers/ItemContainer'
import Signup from './componenets/Signup';
import ItemForm from './componenets/ItemForm';
import Navbar from './componenets/Navbar';
import ProposeTrade from './componenets/ProposeTrade';
import NotificationContainer from './containers/NotificationContainer';


function App(props) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
   
    useEffect(() => {
      // Autologin
      const token = localStorage.getItem('token')
      if(token){
        fetch('http://localhost:3001/autologin', {
          headers: {
            accept: "application/json",
            Authorization: `Bearer: ${token}`
          }
        })
        .then(resp => resp.json())
        .then(userResponse => {
          dispatch(autologin(userResponse))
          dispatch(grabHistory(props.history)) 
        })
      }
    
      // Get all users
      fetch('http://localhost:3001/users')
      .then(resp => resp.json())
      .then(userResponse => {
        dispatch(fetchUsers(userResponse))
      })

      // Get all items
      fetch("http://localhost:3001/items")
      .then(resp => resp.json())
      .then(itemFetchResponse => {
        dispatch(fetchItems(itemFetchResponse))
      })
      
      // Fetch Pending Trades
      fetch('http://localhost:3001/trades')
      .then(resp => resp.json())
      .then(tradeResponse => {
        dispatch(fetchTrades(tradeResponse))
      })

    }, [])
  
  return (
    <div>
      {}
      <Navbar />
      <h1>Tradr</h1>
      <Switch>
        <Route path='/item/new' render={() => <ItemForm />} />
        <Route path='/yourItems' render={() => state.login.proposingTrade ? <ProposeTrade /> : <ItemContainer allItems={state.login.allItems.filter(item => item.user_id === state.login.currentUser.id)} />} />
        <Route path='/allItems' render={() => <ItemContainer allItems={state.login.allItems} />} />
        <Route path='/' render={() => state.login.proposingTrade ? <ProposeTrade /> : <ItemContainer buttonText="Propose Trade" allItems={state.login.allItems.filter(item => item.user_id !== state.login.currentUser.id)} />} />
      </Switch>
    </div>
    );
}

export default withRouter(App);
