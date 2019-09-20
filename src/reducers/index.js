import loginReducer from './login'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    login: loginReducer
})

export default rootReducer