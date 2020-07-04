import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../resources/styles/UsersList.css'
import {Link} from "react-router-dom";
import $ from 'jquery'

class ExactUser extends Component {

    render() {

        const userId = +this.props.match.params.userId;
        const { allUsers } = this.props;

        if (allUsers === undefined || allUsers == null || allUsers.length === 0) {

            return (
                <div
                    id='loading'
                >
                    {''}
                </div>
            )
        }

        const exactUser = allUsers.filter(user => user.id === userId)[0];

        const currIndex = allUsers.indexOf(exactUser);
        const prevIndex = currIndex === 0 ? allUsers.length - 1 : currIndex - 1;
        const nextIndex = currIndex === allUsers.length - 1 ? 0 : currIndex + 1;

        const prevUsrId = allUsers[prevIndex].id;
        const nextUsrId = allUsers[nextIndex].id;

        return (

            <div
                id='container'
            >

                <div
                    className='btn-pusher'
                >

                    <Link
                        to='/users_app/'
                        id='back-to-list'
                    >
                        {''}
                    </Link>

                    <div
                        className='btn-group'
                    >

                        <Link
                            to={`/users_app/${prevUsrId}`}
                            id='prev-user-btn'
                        >
                            {''}
                        </Link>

                        <Link
                            to={`/users_app/${nextUsrId}`}
                            id='next-user-btn'
                        >
                            {''}
                        </Link>

                    </div>

                </div>

                <div
                    id='user-info-wrapper'
                >


                    <div
                        className='column'
                    >

                        <p>
                            Username:
                        </p>

                        <p>
                            First Name:
                        </p>

                        <p>
                            Last Name:
                        </p>

                    </div>

                    <div
                        className='column'
                    >

                        <p>
                            {exactUser.username}
                        </p>

                        <p>
                            {exactUser.first_name}
                        </p>

                        <p>
                            {exactUser.last_name}
                        </p>

                    </div>

                </div>

            </div>

        );
    }
}

ExactUser.propTypes = {
    allUsers: PropTypes.array.isRequired
};

export default ExactUser;