import React, {useEffect} from 'react';
import './App.css';
import LogIn from './componenets/LogIn'
import {useSelector, useDispatch} from 'react-redux'
import {autologin, fetchItems, fetchUsers} from './actions'
import ItemContainer from './containers/ItemContainer'
import Signup from './componenets/Signup';


function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(state)

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
    }, [])

  return (
    <>
    <h1>Tradr</h1>
    <h2>Welcome Current User: {state.login.currentUser.username}</h2>
    <ItemContainer />
    </>
    );
}

export default App;
