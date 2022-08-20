import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route, Link, Navigate,
} from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import NotFound from "./NotFound";

import {ThemeProvider} from "@mui/material";
import {theme} from "./Theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <header>
                <ul>
                    <li>
                        <Link to="/profile">profile</Link>
                    </li>
                    <li>
                        <Link to="/chats">chats</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </header>
            <Routes>
                <Route path="/chats" element={<App/>}/>
                <Route index path="/profile" element={<Profile/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/chats/:chatId" element={<App/>}/>
                <Route path="/404" element={<NotFound/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/404" replace/>}
                />
            </Routes>
        </ThemeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
