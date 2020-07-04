import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../resources/styles/Authorization.css'
import $ from 'jquery'


class Authorization extends Component {

    state = {
        username: '',
        password: '',
        error: ''
    };

    render() {

        const { username, error, password } = this.state;

        return (
            <div
                id='auth-wrapper'
                className={error === '' ? '' : 'error-msg-wrapper'}
            >

                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    maxLength={150}
                    pattern='^[\w.@+-]+$'
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyUp={this.onKeyUp}
                />

                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    maxLength={128}
                    pattern='^(?=.*[A-Z])(?=.*\d).{8,}$'
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyUp={this.onKeyUp}
                />

                <button
                    className='log-in-out-btn'
                    onClick={this.logIn}
                    disabled={
                        username === '' ||
                        password === '' ||
                        ['password', 'auth', 'username'].includes(error)
                    }
                >
                    Log In
                </button>

                {
                    error === ''
                        ?
                        null
                        :
                        <p
                            id='error-alert'
                        >
                            {this.getErrorAlert()}
                        </p>
                }

            </div>
        );
    }

    logIn = () => {
        $('.log-in-out-btn').text('').prop('disabled', true).addClass('auth-loading');
        const { username, password } = this.state;
        $.ajax(
            'https://emphasoft-test-assignment.herokuapp.com/api-token-auth/',
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
        $('.log-in-out-btn').removeClass('auth-loading').addClass('auth-success');
        setTimeout(() => this.props.setToken(data.token), 1000);
    };

    onAuthError = error => {
        const errVal = error.status === 400 ? 'auth' : 'connect';
        const btn = $('.log-in-out-btn');
        btn.removeClass('auth-loading').text('Log In');
        this.setState({
            error: errVal
        });
        if (error.status !== 400) {
            btn.prop('disabled', false)
        }
    };

    onBlur = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const newErrorVal =
            value === '' || RegExp(target.pattern).test(value)
                ?
                ''
                :
                name;
        this.setState({
            error: newErrorVal
        });
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    };

    onKeyUp = e => {
        const { password, username, error } = this.state;
        if (e.which === 13 && password !== '' && username !== '' && error === '') {
            this.logIn()
        }
    };

    getErrorAlert = () => {
        switch (this.state.error) {
            case 'connect':
                return 'Please check your internet connection and try again';
            case 'auth':
                return "Something went wrong. Please check if you've entered the username and the password correctly";
            case 'username':
                return "Username mustn't be longer than 150 characters or contain characters other than letters, digits or @ . + - _";
            case 'password':
                return "Password must be 8-128 characters long and contain at least one capital latin letter and digit";
            default:
                return '';
        }
    };
}

Authorization.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Authorization;