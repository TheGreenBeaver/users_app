import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers/RootReducer'

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
);