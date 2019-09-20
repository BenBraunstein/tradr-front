import React, {useEffect} from 'react';
import './App.css';
import LogIn from './componenets/LogIn'
import {useSelector, useDispatch} from 'react-redux'
import {autologin} from './actions'


function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(state)

    useEffect(() => {
      const token = localStorage.getItem('token')
      if(token){
        fetch('http://localhost:3001/autologin',{
          headers: {
            accept: "application/json",
            Authorization: `Bearer: ${localStorage.getItem("token")}`
          }
        })
        .then(resp => resp.json())
        .then(userResponse => {
          console.log(userResponse)
          dispatch(autologin(userResponse))
        })
      }

    }, [])

  return (
    <>
    <h1>Tradr</h1>
    <h2>Welcome Current User: {state.login.currentUser.username}</h2>
    <LogIn />
    </>
    );
}

export default App;
