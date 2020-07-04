import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../resources/styles/UsersList.css'

class ExactUser extends Component {

    render() {

        const userId = +this.props.match.params.userId;
        const {allUsers} = this.props;
        const exactUser = allUsers.filter(user => user.id === userId)[0];

        return (
            <div
                id='user-info-wrapper'
            >

                {
                    exactUser === undefined
                        ?
                        <div
                            id='loading'
                        >
                            {''}
                        </div>
                        :
                        <React.Fragment>

                            <div
                                className='user-info-container'
                            >
                                <p>
                                    Username:
                                </p>
                                <p>
                                    {exactUser.username}
                                </p>
                            </div>

                            <div
                                className='user-info-container'
                            >
                                <p>
                                    First Name:
                                </p>
                                <p>
                                    {exactUser.first_name}
                                </p>
                            </div>

                            <div
                                className='user-info-container'
                            >
                                <p>
                                    Last name:
                                </p>
                                <p>
                                    {exactUser.last_name}
                                </p>
                            </div>

                        </React.Fragment>

                }

            </div>
        );
    }
}

ExactUser.propTypes = {
    allUsers: PropTypes.array.isRequired
};

export default ExactUser;