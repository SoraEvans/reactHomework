export function getCheckInfo(state) {
    return state.checkbox
}

export function getChatList(state) {
    return state.chats
}

export const selectGists = (state) => state.gists.gists;
export const selectGistsError = (state) => state.gists.error;
export const selectGistsStatus = (state) => state.gists.request;
