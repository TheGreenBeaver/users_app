import { SET_TOKEN, ENTER_PASSWORD, ENTER_USERNAME } from "../actions/Types";

const initialState = {
    username: '',
    password: '',
    token: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ENTER_USERNAME:
            return {
                ...state,
                username: action.payload
            };
        case ENTER_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}