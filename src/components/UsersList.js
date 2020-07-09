import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery'
import '../resources/styles/UsersList.css'
import {BrowserRouter as Router, Route} from "react-router-dom";
import ExactUser from "./ExactUser";
import List from "./List";

class UsersList extends Component {

    state = {
        listOfUsers: []
    };

    componentDidMount() {
        $.ajax(
            {
                url: 'https://emphasoft-test-assignment.herokuapp.com/api/v1/users/',
                type: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Token ' + this.props.token
                },
                success: this.onGetUsersSuccess
            }
        )
    }

    onGetUsersSuccess = data => {
        this.setState({
            listOfUsers: data
        })
    };

    render() {

        const {listOfUsers} = this.state;

        return (
            <div
                id='authorized-view-wrapper'
            >

                <div
                    id='distribution-container'
                >
                    <Router>

                        <Route
                            path='/users_app/'
                            exact
                            render={
                                props => (
                                    <List
                                        {...props}
                                        allUsers={listOfUsers}
                                    />
                                )
                            }
                        />

                        <Route
                            path='/users_app/:userId'
                            exact
                            render={
                                props => (
                                    <ExactUser
                                        {...props}
                                        allUsers={listOfUsers}
                                    />
                                )
                            }
                        />

                    </Router>
                </div>

                <button
                    className='log-in-out-btn'
                    onClick={this.logOut}
                >
                    Log Out
                </button>

            </div>
        );
    }

    logOut = () => {
        $('.log-in-out-btn').text('See Ya!').prop('disabled', true).addClass('log-out');
        setTimeout(() => this.props.setToken(''), 1000);
    };

}

UsersList.propTypes = {
    token: PropTypes.string.isRequired,
    setToken: PropTypes.func.isRequired
};

export default UsersList;