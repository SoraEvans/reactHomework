import { put, takeLatest, delay } from 'redux-saga/effects'
import { botAnswer, getGistsError, getGistsSuccess } from './slice'
import { API_URL_PUBLIC } from '../api/constants'

function* onAddMessageWithSaga({ payload: {id, author} }) {
    const botMessage = `Message sent in chat: ${id} from ${author}`
    yield delay(1000)
    yield put(botAnswer(botMessage))
}

function* getAllGists () {
    try {
        const res = yield fetch(API_URL_PUBLIC);
        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }
        const result = yield res.json();

        yield put(getGistsSuccess(result));
    } catch (err) {
        yield put(getGistsError(err.message));
    }
}

export function* mySaga() {
    yield takeLatest("messages/sendMessage", onAddMessageWithSaga)
}

export function* myGists() {
    yield takeLatest("GISTS::TRIGGER_GISTS_REQUEST", getAllGists)
}
