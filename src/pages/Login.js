import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '../redux/selectors'

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isAuth = useAuth().isAuth
    const dispatch = useDispatch()

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            dispatch({ type: 'LOG_IN', payload: ({ email, password }) })
            setEmail('')
            setPassword('')
        } catch (error) {
            setError(error.message);
        }
    };

    return (!isAuth ?
        <div className="App">
            <form onSubmit={handleSubmit}>
                <p>Fill in the form below to login to your account.</p>
                <div>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>
                <div>
                    <input
                        placeholder="Password"
                        name="password"
                        onChange={handlePassChange}
                        value={password}
                        type="password"
                    />
                </div>
                <div>
                    {error && <p>{error}</p>}
                    <button type="submit">Login</button>
                </div>
                <hr />
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
            : <Navigate to="/chats" />
    );
};