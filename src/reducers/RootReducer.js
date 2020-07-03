import { combineReducers } from "redux";
import authorizationReducer from './AuthorizationReducer'

export default combineReducers({
    authState: authorizationReducer
})
