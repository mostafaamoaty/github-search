import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { AddHistoryProps, SearchState, Repository, User } from './types';

const initialState: SearchState = {
    users: {
        currentData: undefined,
        history: {}
    },
    repositories: {
        currentData: undefined,
        history: {
        }
    },
    isFetching: false,
    error: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addUserHistory: (state, action: PayloadAction<AddHistoryProps>) => {
            /* Save users' search results in history where key equals the search query */
            const { key, data, pages, totalCount } = action.payload;
            state.users.history[key] = { data: data as User[], pages, totalCount }
        },
        addRepoHistory: (state, action: PayloadAction<AddHistoryProps>) => {
            /* Save repos' search results in history where key equals the search query */
            const { key, data, pages, totalCount } = action.payload;
            state.repositories.history[key] = { data: data as Repository[], pages, totalCount }
        },
        setUserData: (state, action: PayloadAction<User[] | undefined>) => {
            state.users.currentData = action.payload
        },
        setReposData: (state, action: PayloadAction<Repository[] | undefined>) => {
            state.repositories.currentData = action.payload
        },
        setFetchingStatus: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    }
})

export const { addRepoHistory, addUserHistory, setUserData, setReposData, setFetchingStatus, setError } = searchSlice.actions

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, searchSlice.reducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunk]
})

export const persistor = persistStore(store)
