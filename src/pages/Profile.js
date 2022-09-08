import '../style.scss'
import { Checkbox } from '@mui/material'
import { pink } from '@mui/material/colors'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { change } from '../redux/slice'
import { getCheckInfo } from '../redux/selectors'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

function Profile() {
    const check = useSelector(getCheckInfo, shallowEqual)
    const dispatch = useDispatch()

    const handleCheckbox = () => dispatch(change())

    return (
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
        </div>
    );
}

export default Profile;
