import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import ItemContainer from './containers/ItemContainer'
import ItemForm from './componenets/ItemForm';
import Navbar from './componenets/Navbar';
import ProposeTrade from './componenets/ProposeTrade';
import Spinner from 'react-spinner-material';
import {autologin, fetchItems, fetchUsers, fetchTrades, grabHistory, fetchMessages} from './actions'
import Footer from './componenets/Footer';
import Chat from './componenets/Chat';
import './App.css';

function App(props) {
  const [doneLoading, changeLoading] = useState(false)
  const state = useSelector(state => state.login)
  const dispatch = useDispatch()
  
  useEffect(() => {
    // Redux router
    dispatch(grabHistory(props.history))
      // Autologin
      const token = localStorage.getItem('token')
      if(token){
        fetch(`${state.url}/autologin`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer: ${token}`
          }
        })
        .then(resp => resp.json())
        .then(userResponse => {
          dispatch(autologin(userResponse))
        })
      }
      
      // Get all users
      fetch(`${state.url}/users`)
      .then(resp => resp.json())
      .then(userResponse => {
        dispatch(fetchUsers(userResponse))
      })
      
      // Get all items
      fetch(`${state.url}/items`)
      .then(resp => resp.json())
      .then(itemFetchResponse => {
        dispatch(fetchItems(itemFetchResponse))
      })
      
      // Fetch Pending Trades
      fetch(`${state.url}/trades`)
      .then(resp => resp.json())
      .then(tradeResponse => {
        dispatch(fetchTrades(tradeResponse))
        changeLoading(true)
      })

      // Fetch Messages
      const interval = setInterval(() => {
        if(state.currentUser.username){
          fetch(`${state.url}/messages`)
          .then(resp => resp.json())
          .then(messageListResponse => {
                const messageList = messageListResponse.map(message => {
                  if (message.kind === 'text') {
                    return {
                      author: message.author,
                      type: message.kind,
                      data: {
                        text: message.content
                      }
                    }
                  }
                  else {
                    return {
                      author: message.author,
                      type: message.kind,
                      data: {
                        emoji: message.content
                      }
                    }
                  }
                })
                dispatch(fetchMessages(messageList))
            })
        }
      }, 2000)
      return () => clearInterval(interval)
      
    }, [dispatch, props.history, state.url, state.currentUser.username])
    
    if (!doneLoading) {
      return <center style={{ marginTop: '15em' }}><Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} /></center>
    }
    
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path='/item/new' render={() => <ItemForm />} />
        <Route path='/yourItems' render={() => state.proposingTrade ? <ProposeTrade /> : <ItemContainer yourItems={true} allItems={state.allItems.filter(item => item.user_id === state.currentUser.id)} />} />
        <Route path='/allItems' render={() => <ItemContainer allItems={state.allItems} yourItems={false} />} />
        <Route path='/' render={() => state.proposingTrade ? <ProposeTrade /> : <ItemContainer buttonText="Propose Trade" allItems={state.allItems.filter(item => item.user_id !== state.currentUser.id)} />} />
      </Switch>
      {state.currentUser.username ? <Chat /> : null}
      <Footer />
    </div>
    );
}

export default withRouter(App);
