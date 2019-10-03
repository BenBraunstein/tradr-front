import defaultState from './default'
import alertify from 'alertifyjs'

const loginReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'LOG_IN':
            localStorage.setItem('token', action.payload.token)
            return {...state, currentUser: action.payload.user}
        case 'LOG_OUT':
            return { ...state, currentUser: {}, pendingTrades: [], proposingTrade: false }
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
            return {...state, pendingTrades: [action.payload,...state.pendingTrades]}
        case 'GRAB_HISTORY':
            return {...state, history: action.payload}
        case 'UPDATE_HISTORY':
            state.history.push(action.payload)
            return { ...state, history: state.history}
        case 'NEW_ITEM':
            return {...state, allItems: [...state.allItems, action.payload]}
        case 'UPDATE_SEARCH':
            return {...state, searchText: action.payload.toLowerCase()}
        case 'DELETE_ITEM':
            return {...state, allItems: state.allItems.filter(item => item.id !== action.payload.id)}
        case 'EDIT_ITEM':
            const editItem = state.allItems.find(item => item.id === action.payload.id)
            const index = state.allItems.indexOf(editItem)
            const newAllItems = state.allItems.filter(item => item.id !== action.payload.id)
            newAllItems.splice(index, 0, action.payload)
            return {...state, allItems: newAllItems}
        case 'ADD_MESSAGE':
            return {...state, messageList: [...state.messageList, action.payload], newMessageCount: 0}
        case 'FETCH_MESSAGES':
            if(state.messageList.length !== action.payload.length){
                if(state.messageList.length > 1){
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.message("New Chat")
                    document.querySelector('#new-chat-noise').play()
                }
                return { ...state, messageList: action.payload, newMessageCount: Math.abs(state.messageList.length - action.payload.length)}
            }
            return state
        default: 
            return state
    }
}
export default loginReducer