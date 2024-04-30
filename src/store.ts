import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authApi } from "./entities/Auth/api/AuthApi"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { userSlice } from "./entities/Auth/redusers/userSlice"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { emailApi } from "./entities/Email/api/emailApi"
import { emailGroupApi } from "./entities/EmailGroup/api/EmailGroupApi"
import { userApi } from "./entities/User/api/userApi"
import { themeSlice } from "./entities/Theme/slices/themeSlice"

export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
    [emailGroupApi.reducerPath]: emailGroupApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [themeSlice.reducerPath]: themeSlice.reducer,
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(authApi.middleware)
            .concat(emailApi.middleware)
            .concat(emailGroupApi.middleware)
            .concat(userApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const cleanUpStore = () => {
    localStorage.removeItem("persist:root")
}
