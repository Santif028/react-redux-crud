import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserID = string;

export interface User {
    name: string;
    email: string;
    github: string
}

export interface UserWithId extends User {
    id: UserID;

}

const DEFAULT_STATE: UserWithId[] = [
    {
        id: "1",
        name: "Pedro picapiedra",
        email: "pedropiedra@gmail.com",
        github: "Pedropicapiedra",
    },
    {
        id: "2",
        name: "Oscar trebol",
        email: "oscartrebol@gmail.com",
        github: "Oscartrebol",
    },
    {
        id: "3",
        name: "Sergio Uriarte",
        email: "sergiouri@gmail.com",
        github: "SergioUri",
    },
]

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__");
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, { id, ...action.payload }]
        },
        deleteUserById: (state, action: PayloadAction<UserID>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        }
    },
})

export default usersSlice.reducer;

export const { addNewUser, deleteUserById } = usersSlice.actions;