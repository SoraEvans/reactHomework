import { put, takeLatest, delay } from 'redux-saga/effects'
import { botAnswer } from './slice'

function* onAddMessageWithSaga({ payload: {id, author} }) {
    const botMessage = `Message sent in chat: ${id} from ${author}`
    yield delay(1000)
    yield put(botAnswer(botMessage))
}

function* mySaga() {
    yield takeLatest("messages/sendMessage", onAddMessageWithSaga)
}

export default mySaga
