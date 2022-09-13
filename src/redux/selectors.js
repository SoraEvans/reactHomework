import { useSelector } from 'react-redux'

export function getCheckInfo(state) {
    return state.checkbox
}

export function getChatList(state) {
    return state.chats
}

export const useAuth = () => {
    const { email, token, id } = useSelector(state => {
        return state.auth
    })
    return (
        {
            isAuth: !!email,
            email,
            token,
            id
        }
    )
}

export const selectGists = (state) => state.gists.gists;
export const selectGistsError = (state) => state.gists.error;
export const selectGistsStatus = (state) => state.gists.request;
