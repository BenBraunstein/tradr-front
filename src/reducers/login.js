import defaultState from './default'

const loginReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOG_IN':
            localStorage.setItem('token', action.payload.token)
            return {...state, currentUser: action.payload.user}
        case 'LOG_OUT':
            return { ...state, currentUser: {}, pendingTrades: [] }
        case 'AUTOLOGIN':
            return {...state, currentUser: action.payload}
        case 'SIGN_UP':
            localStorage.setItem('token', action.payload.token)
            return { ...state, currentUser: action.payload.user}
        case 'FETCH_ITEMS':
            return {...state, allItems: action.payload}
        case 'FETCH_USERS':
            return {...state, allUsers: action.payload}
        case 'TOGGLE_PROPOSING_TRADE':
            return {...state, proposingTrade: !state.proposingTrade}
        case 'SET_TRADE_ITEM':
            return {...state, itemToTrade: action.payload}
        case 'FETCH_TRADES':
            return {...state, pendingTrades: action.payload}
        case 'DECLINE_TRADE':
            return {...state, pendingTrades: state.pendingTrades.filter(trade => trade.id !== action.payload.id)}
        case 'ACCEPT_TRADE':
            return {...state, pendingTrades: state.pendingTrades.filter(trade => trade.id !== action.payload.id)}
        case 'NEW_TRADE':
            return {...state, pendingTrades: [action.payload ,...state.pendingTrades]}
        case 'GRAB_HISTORY':
            return {...state, history: action.payload}
        case 'UPDATE_HISTORY':
            state.history.push(action.payload)
            return { ...state, history: state.history}
        default: 
            return state
    }
}
export default loginReducer