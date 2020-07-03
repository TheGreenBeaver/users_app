import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class UsersList extends Component {

    render() {
        return (
            <div>
            </div>
        );
    }
}

UsersList.propTypes = {
    token: PropTypes.string.isRequired
};

const mapStateToProps = storeState => ({
    token: storeState.authState.token
});

export default connect(mapStateToProps, {})(UsersList);