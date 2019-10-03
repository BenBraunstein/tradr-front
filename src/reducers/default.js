const defaultState = {
    currentUser: {},
    allUsers: [],
    allItems: [],
    messageList: [],
    newMessageCount: 0,
    history: {},
    pendingTrades: [],
    proposingTrade: false,
    itemToTrade: null,
    searchText: '',
    url: 'https://tradr-api.herokuapp.com'
    // url: 'http://localhost:3001'
}

export default defaultState