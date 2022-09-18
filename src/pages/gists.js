import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGists, selectGistsError, selectGistsStatus, useAuth } from '../redux/selectors'
import { Button } from '@mui/material'
import { Navigate } from 'react-router-dom'

export const GistsList = () => {
    const dispatch = useDispatch()
    const gists = useSelector(selectGists);
    const error = useSelector(selectGistsError);
    const status = useSelector(selectGistsStatus);
    const isAuth = useAuth().isAuth

    const requestGists = () => {
        dispatch({ type: 'GISTS::TRIGGER_GISTS_REQUEST' });
    };

    useEffect(() => {
        requestGists()
    }, [])

    const renderGist = useCallback(
        (gist) => {
            return <li key={gist.gameID}>
                {gist.external}
                <img src={gist.thumb} alt="logo" style={{margin: "0 20px"}}/>
            </li>
        },
        []
    );

    if (!isAuth) return <Navigate to="/login"/>

    if (error) {
        return (
            <>
                <h3>Error</h3>
                <Button
                    onClick={requestGists}
                    variant="contained"
                >
                    Reload
                </Button>
            </>
        );
    }

    return (
        <div className="App">
            <div>
                Game gist
                <ul>
                    <li>Status: {status}</li>
                    {gists?.map(renderGist)}
                </ul>
            </div>
        </div>
    )
};