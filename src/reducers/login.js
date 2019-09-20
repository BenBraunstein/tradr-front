import defaultState from './default'

const loginReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOG_IN':
            localStorage.setItem('token', action.payload.token)
            return {...state, currentUser: action.payload.user}
        case 'LOG_OUT':
            return {...state, currentuser: {}}
        case 'AUTOLOGIN':
            return {...state, currentUser: action.payload}
        default: 
            return state
    }
}
export default loginReducer