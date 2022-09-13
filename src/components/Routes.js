import { ThemeProvider } from '@mui/material'
import { theme } from '../Theme'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import App from '../pages/App'
import Profile from '../pages/Profile'
import Home from '../pages/Home'
import { GistsList } from '../pages/gists'
import React from 'react'
import NotFound from '../pages/NotFound'
import { useAuth } from '../redux/selectors'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/slice'


export const RoutesComponent = () => {
    const isAuth = useAuth().isAuth
    const dispatch = useDispatch()

    return <BrowserRouter>
        <ThemeProvider theme={theme}>
            <header>
                <ul>
                    {isAuth && (
                        <>
                            <li>
                                <Link to="/profile">profile</Link>
                            </li>
                            <li>
                                <Link to="/chats">chats</Link>
                            </li>
                            <li>
                                <Link to="/gists">Game gist</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {!isAuth && <>
                        <li>
                            <Link to="/signup">Registration</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>}
                    {isAuth && <li>
                        <div onClick={() => dispatch(logOut())}>Log out</div>
                    </li>}
                </ul>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/chats" element={<App />}>
                    <Route path=':chatID' element={<App />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/gists" element={<GistsList />} />
                <Route path="/404" element={<NotFound />} />
                <Route
                    path="*"
                    element={<Navigate to="/404" replace />}
                />
            </Routes>
        </ThemeProvider>
    </BrowserRouter>
}
