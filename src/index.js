import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route, Link, Navigate,
} from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import NotFound from './NotFound';
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'

import { CircularProgress, ThemeProvider } from '@mui/material'
import { theme } from './Theme'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<CircularProgress />}>
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
                        <Route path="/chats" element={<App />}>
                            <Route path=":chatId" element={<App />} />
                        </Route>
                        <Route index path="/profile" element={<Profile />} />
                        <Route exact path="/" element={<Home />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route
                            path="*"
                            element={<Navigate to="/404" replace />}
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
