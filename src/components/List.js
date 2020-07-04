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
    }
}

List.propTypes = {
    allUsers: PropTypes.array.isRequired
};

export default List;