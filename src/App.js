import React, { Component } from 'react';
import Authorization from "./components/Authorization";
import UsersList from "./components/UsersList";
import '../src/resources/styles/Main.css'

class App extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem('token');
        if (token != null) {
            this.state.token = token
        }
    }

    state = {
        token: ''
    };

    componentDidMount() {
        window.addEventListener('beforeunload', this.saveState, false)
    }

    saveState = () => {
        localStorage.setItem('token', this.state.token)
    };

    render() {

        const { token } = this.state;

        return (
            <div
                id='main-container'
            >
                <img
                    id='logo'
                    src='https://raw.githubusercontent.com/TheGreenBeaver/ImgStorage/3fd5d56bc45eb288f0db18b0e27f40b224946838/usersApp/logo.svg'
                    alt='logo'
                />

                {
                    token === ''
                        ?
                        <Authorization
                            setToken={this.setToken}
                        />
                        :
                        <UsersList
                            setToken={this.setToken}
                            token={token}
                        />
                }

            </div>
        );
    }

    setToken = token => {
        this.setState({
            token: token
        })
    }
}

export default App;
