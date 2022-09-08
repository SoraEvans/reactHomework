import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { chatsSlice, counterSlice, gistsSlice } from './slice'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { mySaga, myGists } from './saga'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    chats: chatsSlice.reducer,
    profile: counterSlice.reducer,
    gists: gistsSlice.reducer
})

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mySaga)
sagaMiddleware.run(myGists)

export const persistor = persistStore(store)
