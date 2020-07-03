import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../resources/styles/Authorization.css'
import $ from 'jquery'


class Authorization extends Component {

    state = {
        username: '',
        password: '',
        authError: false
    };

    render() {

        const { authError } = this.state;

        return (
            <div
                id='auth-wrapper'
            >

                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    onChange={this.onChange}
                />

                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    onChange={this.onChange}
                />

                <button
                    className='log-in-btn'
                    onClick={this.logIn}
                >
                    Log In
                </button>

                {
                    authError
                        ?
                        <p
                            id='auth-error-alert'
                        >
                            Something went wrong... Either the password or the username must be incorrect
                        </p>
                        :
                        null
                }

            </div>
        );
    }

    logIn = () => {
        $('.log-in-btn').text('').prop('disabled', true).addClass('auth-loading');
        const { username, password } = this.state;
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
                success: this.onAuthSuccess,
                error: this.onAuthError
            }
        )
    };

    onAuthSuccess = data => {
        this.props.setToken(data.token)
    };

    onAuthError = () => {
        this.setState({
            authError: true
        });
        $('.log-in-btn').removeClass('auth-loading').text('Log In').prop('disabled', false)
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            authError: false
        })
    }
}

Authorization.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Authorization;