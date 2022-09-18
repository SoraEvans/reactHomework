import { put, takeLatest, delay } from 'redux-saga/effects'
import { botAnswer, getChats, getGistsError, getGistsSuccess, logIn } from './slice'
import { API_URL_PUBLIC } from '../api/constants'
import { onValue, ref } from 'firebase/database'
import { auth, database } from '../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

function* onAddMessageWithSaga({ payload: { id, author } }) {
    const botMessage = `Message sent in chat: ${id} from ${author}`
    yield delay(1000)
    yield put(botAnswer(botMessage))
}

function* getAllGists() {
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

function* getUserData(action) {
    try {
        const starCountRef = ref(database, 'chats');
        yield onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            action.payload.dispatch(getChats(data))
        });
    } catch (err) {
        console.log(err.message);
    }
}

function* getUser(action) {
    try {
        const {email, password} = action.payload
        const userCredit = yield signInWithEmailAndPassword(auth, email, password)
        yield put(logIn(userCredit));
    } catch (err) {
        console.log(err.message);
    }
}

export function* mySaga() {
    yield takeLatest("messages/sendMessage", onAddMessageWithSaga)
}

export function* myGists() {
    yield takeLatest("GISTS::TRIGGER_GISTS_REQUEST", getAllGists)
}

export function* myAccount() {
    yield takeLatest("FIREBASE_GET_CHATS", getUserData)
}

export function* myData() {
    yield takeLatest("LOG_IN", getUser)
}