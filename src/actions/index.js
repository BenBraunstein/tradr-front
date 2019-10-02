const login = (loginResponse) => {
    return {
        type: 'LOG_IN',
        payload: loginResponse
    }
}

const logout = () => {
    return {
        type: 'LOG_OUT'
    }
}

const autologin = (autologinResponse) => {
    return {
        type: 'AUTOLOGIN',
        payload: autologinResponse
    }
}

const signup = (signupResponse) => {
    return {
        type: 'SIGN_UP',
        payload: signupResponse
    }
}

const fetchItems = (signupResponse) => {
    return {
        type: 'FETCH_ITEMS',
        payload: signupResponse
    }
}

const fetchUsers = (userResponse) => {
    return {
        type: 'FETCH_USERS',
        payload: userResponse
    }
}

const toggleProposingTrade = () => {
    return {
        type: 'TOGGLE_PROPOSING_TRADE'
    }
}

const itemToTrade = (item) => {
    return {
        type: 'SET_TRADE_ITEM',
        payload: item
    }
}

const fetchTrades = (pendingTrades) => {
    return {
        type: 'FETCH_TRADES',
        payload: pendingTrades
    }
}

const declineTrade = (declineResponse) => {
    return {
        type: 'DECLINE_TRADE',
        payload: declineResponse
    }
}

const acceptTrade = (acceptResponse) => {
    return {
        type: 'ACCEPT_TRADE',
        payload: acceptResponse
    }
}

const newPendingTrade = (tradeResponse) => {
    return {
        type: 'NEW_TRADE',
        payload: tradeResponse
    }
}

const grabHistory = (history) => {
    return {
        type: 'GRAB_HISTORY',
        payload: history
    }
}

const updateHistory = (url) => {
    return {
        type: 'UPDATE_HISTORY',
        payload: url
    }
}

const newItem = (newItemResponse) => {
    return {
        type: 'NEW_ITEM',
        payload: newItemResponse
    }
}

const updateSearchText = (searchText) => {
    return {
        type: 'UPDATE_SEARCH',
        payload: searchText
    }
}

const deleteItem = (deletedItem) => {
    return {
        type: 'DELETE_ITEM',
        payload: deletedItem
    }
}

const editItem = (editResponse) => {
    return {
        type: 'EDIT_ITEM',
        payload: editResponse
    }
}

const addMessage = (message) => {
    return {
        type: 'ADD_MESSAGE',
        payload: message
    }
}

const fetchMessages = (messageList) => {
    return {
        type: 'FETCH_MESSAGES',
        payload: messageList
    }
}

export {login, autologin, signup, fetchItems, fetchUsers, toggleProposingTrade, itemToTrade, fetchTrades, declineTrade, acceptTrade, newPendingTrade, logout, grabHistory, updateHistory, newItem, updateSearchText, deleteItem, editItem, addMessage, fetchMessages}