import React from 'react';
import { Provider } from "react-redux";
import Authorization from "./components/Authorization";
import UsersList from "./components/UsersList";
import { store } from './Store'
import '../src/resources/styles/Main.css'

function App() {
    return (
        <Provider store={store}>
            <div
                id='main-container'
            >
                <img
                    id='logo'
                    src='https://raw.githubusercontent.com/TheGreenBeaver/ImgStorage/4b1beb035a7db28d9ea803129695e146d5c3a20b/usersApp/logo.svg'
                    alt='logo'
                />

                <Authorization />

            </div>
        </Provider>
    );
}

export default App;
