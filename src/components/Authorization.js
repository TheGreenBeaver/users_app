import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { authorize, enterUserData } from "../actions/AuthorizationActions";
import { ENTER_PASSWORD, ENTER_USERNAME } from '../actions/Types'
import '../resources/styles/Authorization.css'
import UsersList from "./UsersList";


class Authorization extends Component {

    render() {

        return (
            <div
                id='auth-wrapper'
            >

                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    onChange={e => this.onChange(ENTER_USERNAME, e)}
                />

                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    onChange={e => this.onChange(ENTER_PASSWORD, e)}
                />


                <button
                    onClick={() => this.logIn()}
                >
                    Log In
                </button>

                <UsersList/>

            </div>
        );
    }

    logIn = () => {
        const { username, password } = this.props;
        this.props.authorize(username, password);
    };

    onChange = (dataType, e) => {
        const userData =  e.target.value;
        enterUserData(dataType, userData)
    }
}

Authorization.propTypes = {
    authorize: PropTypes.func.isRequired,
    enterUserData: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

const mapStateToProps = storeState => ({
    username: storeState.username,
    password: storeState.password
});

export default connect(mapStateToProps, { authorize, enterUserData })(Authorization);