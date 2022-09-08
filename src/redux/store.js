import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { chatsSlice, counterSlice } from './slice'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import mySaga from './saga'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    chats: chatsSlice.reducer,
    profile: counterSlice.reducer,
})

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mySaga)

export const persistor = persistStore(store)
