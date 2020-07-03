import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UsersList extends Component {

    render() {
        return (
            <div>
                {this.props.token}
            </div>
        );
    }
}

UsersList.propTypes = {
    token: PropTypes.string.isRequired
};

export default UsersList;