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
        case 'SIGN_UP':
            localStorage.setItem('token', action.payload.token)
            return { ...state, currentUser: action.payload.user }
        case 'FETCH_ITEMS':
            return {...state, allItems: action.payload}
        case 'FETCH_USERS':
            return {...state, allUsers: action.payload}
        default: 
            return state
    }
}
export default loginReducer