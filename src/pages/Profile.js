import '../style.scss'
import { Checkbox } from '@mui/material'
import { pink } from '@mui/material/colors'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { change } from '../redux/slice'
import { getCheckInfo, useAuth } from '../redux/selectors'
import { Navigate } from 'react-router-dom'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

function Profile() {
    const check = useSelector(getCheckInfo, shallowEqual)
    const dispatch = useDispatch()
    const isAuth = useAuth().isAuth

    const handleCheckbox = () => dispatch(change())

    return (
        isAuth ?
            <div className="App">
                Profile
                <div
                    onClick={handleCheckbox}
                    role="checkbox"
                    aria-checked={false}
                >
                    Redux checkbox:<Checkbox
                    {...label}
                    checked={check}
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                />
                </div>
            </div> : <Navigate to="/login" />
    );
}

export default Profile;
