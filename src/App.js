import React, { Component } from 'react';
import Authorization from "./components/Authorization";
import UsersList from "./components/UsersList";
import '../src/resources/styles/Main.css'

class App extends Component {

    state = {
        token: ''
    };

    render() {

        const { token } = this.state;

        return (
            <div
                id='main-container'
            >
                <img
                    id='logo'
                    src='https://raw.githubusercontent.com/TheGreenBeaver/ImgStorage/4b1beb035a7db28d9ea803129695e146d5c3a20b/usersApp/logo.svg'
                    alt='logo'
                />

                {
                    token === ''
                        ?
                        <Authorization setToken={this.setToken} />
                        :
                        <UsersList token={token} />
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
