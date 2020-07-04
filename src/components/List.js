import React, {Component} from 'react';
import '../resources/styles/UsersList.css'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import $ from 'jquery';

class List extends Component {

    state = {
        search: ''
    };

    render() {
        return (
            <React.Fragment>

                <div
                    id='search-bar-container'
                >

                    <img
                        id='search-icon'
                        src='https://raw.githubusercontent.com/TheGreenBeaver/ImgStorage/ad90900ff126f32a44528ac6fab06596a98861d4/usersApp/search.svg'
                        alt='search'
                    />

                    <input
                        id='search-input'
                        type='text'
                        placeholder='search user'
                        onChange={this.search}
                    />

                </div>

                <div
                    id='users-list-container'
                    onScroll={this.scrollShadow}
                >
                    <div
                        id='shadow-dropper'
                    >
                        {''}
                    </div>

                    <this.ListItems />

                </div>

            </React.Fragment>
        );
    }

    ListItems = () => {

        const { allUsers } =  this.props;
        const { search } = this.state;

        const filteredList = allUsers.filter(
            user => user.username.includes(search)
        );

        return (
            <ul>
                {
                    filteredList.map(
                        user => (
                            <li key={user.id}>
                                <Link
                                    className='user-link'
                                    to={`/users_app/${user.id}`}
                                >
                                    {user.username}
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
        )
    };

    search = e => {
        this.setState({
            search: e.target.value
        })
    };

    scrollShadow = () => {
        const scrollTop = $('#users-list-container').scrollTop();
        $('#shadow-dropper').css('top', scrollTop);
    }
}

List.propTypes = {
    allUsers: PropTypes.array.isRequired
};

export default List;