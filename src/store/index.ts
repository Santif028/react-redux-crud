import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";
import postsReducer  from "./posts/slice"

const persistanceLocalStorageMiddleware = store => next => action => {
    next(action)
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

export const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch