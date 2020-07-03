import { SET_TOKEN } from "./Types";
import $ from 'jquery'

export const authorize = (username, password) => dispatch => {
    console.log(username + ' ' + password);
    $.ajax(
        'http://emphasoft-test-assignment.herokuapp.com/api-token-auth/',
        {
            type: 'POST',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'content-type': 'application/json'
            },
            success: data => {
                dispatch({
                    type: SET_TOKEN,
                    payload: data.token
                })
            }
        }
    )
};

export const enterUserData = (dataType, userData) => {
    return {
        type: dataType,
        payload: userData
    }
};