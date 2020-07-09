import React, {Component} from 'react';
import '../resources/styles/UsersList.css'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';


class List extends Component {

    constructor(props) {
        super(props);

        this.scrollRef = React.createRef();
    }

    state = {
        search: '',
        sortDirection: 1
    };

    render() {
        return (
            <React.Fragment>

                <div
                    id='search-bar-container'
                >

                    <div
                        className='in-search-container'
                    >
                        <img
                            id='search-icon'
                            src='https://raw.githubusercontent.com/TheGreenBeaver/ImgStorage/ad90900ff126f32a44528ac6fab06596a98861d4/usersApp/search.svg'
                            alt='search'
                        />
                    </div>

                    <input
                        id='search-input'
                        type='text'
                        placeholder='search user'
                        onChange={this.search}
                    />

                    <div
                        className='in-search-container'
                    >
                        <button
                            className={this.state.sortDirection === 1 ? 'up-sort' : 'down-sort'}
                            onClick={this.toggleSort}
                        >
                            {''}
                        </button>
                    </div>

                </div>

                <Scrollbars
                    autoHide={true}
                    autoHideDelay={500}
                    onUpdate={this.scrollShadow}
                    hideTracksWhenNotNeeded={true}
                    renderThumbVertical={this.renderThumb}
                    renderTrackVertical={this.renderTrack}
                    renderView={this.renderView}
                    universal={true}
                    ref={this.scrollRef}
                    style={
                        {
                            width: '80%',
                            height: '70%',
                            margin: '3vh auto auto',
                            borderRadius: '10px 10px'
                        }
                    }
                >
                    <div
                        id='shadow-dropper'
                    >
                        {''}
                    </div>

                    <this.ListItems />

                </Scrollbars>

            </React.Fragment>
        );
    }

    ListItems = () => {

        const { search, sortDirection } = this.state;
        const allUsers = this.props.allUsers.sort(
            (userA, userB) => sortDirection * (+userA.id - (+userB.id))
        );

        const filteredList = allUsers.filter(
            user => user.username.includes(search)
        );

        return (
            <ul>
                {
                    filteredList.map(
                        user => (
                            <li
                                key={user.id}
                                onClick={() => this.selectUser(user.id)}
                            >

                                <div
                                    className='user-link'
                                >
                                    <p className='u-id'>
                                        Id:{user.id}
                                    </p>
                                    <p className='u-name'>
                                        {user.username}
                                    </p>
                                </div>

                            </li>
                        )
                    )
                }
            </ul>
        )
    };

    renderView({ ...props }) {
        return (
            <div
                id='users-list-container'
                {...props}
            />
        )
    }

    renderTrack({ ...props }) {
        return (
            <div
                className='scroll-track'
                {...props}
            />
        );
    }

    renderThumb({ ...props }) {
        return (
            <div
                className='scroll-thumb'
                {...props}/>
        );
    }

    search = e => {
        this.scrollRef.current.scrollTop();
        this.setState({
            search: e.target.value
        })
    };

    scrollShadow = values => {
        const { scrollTop } = values;
        $('#shadow-dropper').css('top', scrollTop);
    };

    toggleSort = () => {
        this.setState({
            sortDirection: -this.state.sortDirection
        })
    };

    selectUser = id => {
        this.props.history.push(`/users_app/${id}`)
    }
}

List.propTypes = {
    allUsers: PropTypes.array.isRequired
};

export default List;